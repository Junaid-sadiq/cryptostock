package fi.tuni.compse110.cryptostock.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import fi.tuni.compse110.cryptostock.services.datastructures.GlobalQuoteResponse;
import fi.tuni.compse110.cryptostock.services.datastructures.Stock;
import fi.tuni.compse110.cryptostock.services.datastructures.StockOverviewResponse;
import fi.tuni.compse110.cryptostock.services.datastructures.Stocks;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.ArrayList;
import java.util.List;

@Service
public class StockStatService {
    private static final String STOCK_API_URL = "https://www.alphavantage.co/query";
    private static final String API_KEY = "U9Z319NOVD8MDL8S";
    private static final String GLOBAL_QUOTE = "GLOBAL_QUOTE";
    private static final String OVERVIEW = "OVERVIEW";
    private static final String TIME_SERIES_DAILY = "TIME_SERIES_DAILY";

    /**
     * Get stock details for a list of symbols.
     *
     * @param symbols Array of stock symbols.
     * @param limit   Maximum number of stocks to retrieve.
     * @return Stocks object containing the list of stocks.
     */
    public Stocks getStocks(String[] symbols, int limit) {
        Stocks stocks = new Stocks();

        if (symbols == null || symbols.length == 0) {
            return stocks;
        }

        for (int i = 0; i < Math.min(symbols.length, limit); i++) {
            String currentSymbol = symbols[i];
            Stock stock = getStockBySymbol(currentSymbol);
            if (stock != null) {
                stocks.stockList.add(stock);
            }
        }

        return stocks;
    }

    /**
     * Get stock details for a single symbol.
     *
     * @param symbol Stock symbol.
     * @return Stock object containing the stock details.
     */
    public Stock getStockBySymbol(String symbol) {
        String quoteResponseBody = getResponseBody(GLOBAL_QUOTE, symbol);
        String overviewResponseBody = getResponseBody(OVERVIEW, symbol);

        ObjectMapper objectMapper = new ObjectMapper();

        try {
            GlobalQuoteResponse globalQuoteResponse = objectMapper.readValue(quoteResponseBody, GlobalQuoteResponse.class);
            StockOverviewResponse stockOverviewResponse = objectMapper.readValue(overviewResponseBody, StockOverviewResponse.class);

            if (globalQuoteResponse.globalQuote == null || stockOverviewResponse == null) {
                System.out.println("Required data sections not found in responses.");
                return null;
            }

            GlobalQuoteResponse.GlobalQuote globalQuote = globalQuoteResponse.globalQuote;
            return createStock(globalQuote, stockOverviewResponse);
        } catch (JsonProcessingException e) {
            System.out.println("Not found: " + symbol);
            e.printStackTrace();
            return null;
        }
    }

    /**
     * Create a Stock object from GlobalQuote and StockOverviewResponse.
     *
     * @param globalQuote  GlobalQuote object.
     * @param overviewResponse StockOverviewResponse object containing overview details.
     * @return Stock object.
     */
    private Stock createStock(GlobalQuoteResponse.GlobalQuote globalQuote, StockOverviewResponse overviewResponse) {
        Stock stock = new Stock();
        stock.symbol = globalQuote.symbol;
        stock.price = globalQuote.price;
        stock.volume = globalQuote.volume;
        stock.priceChange = globalQuote.priceChange;
        stock.marketCap = overviewResponse.marketCap;
        stock.fullName = overviewResponse.fullName;
        stock.exchange = overviewResponse.exchange;
        stock.sector = overviewResponse.sector;
        return stock;
    }

    /**
     * Get stock names for a list of symbols.
     *
     * @param symbols Array of stock symbols.
     * @param limit   Maximum number of stock names to retrieve.
     * @return List of stock names.
     */
    public List<String> getStockNames(String[] symbols, int limit) {
        List<String> stockNames = new ArrayList<>();

        if (symbols == null || symbols.length == 0) {
            return stockNames;
        }

        for (int i = 0; i < Math.min(symbols.length, limit); i++) {
            String currentSymbol = symbols[i];
            Stock stock = getStockBySymbol(currentSymbol);
            if (stock != null && stock.fullName != null) {
                stockNames.add(stock.fullName);
            }
        }

        return stockNames;
    }

    /**
     * Get historical prices for a stock symbol.
     *
     * @param symbol Stock symbol.
     * @return List of historical prices.
     */
    public List<List<Object>> getHistoricalPrices(String symbol) {
        List<List<Object>> historicalData = new ArrayList<>();

        String responseBody = getResponseBody(TIME_SERIES_DAILY, symbol);

        if (responseBody == null || responseBody.isEmpty()) {
            System.out.println("No data returned for symbol: " + symbol);
            return historicalData;
        }

        ObjectMapper objectMapper = new ObjectMapper();

        try {
            JsonNode rootNode = objectMapper.readTree(responseBody);
            JsonNode timeSeriesNode = rootNode.get("Time Series (Daily)");

            if (timeSeriesNode == null) {
                System.out.println("Time Series data not found in response for symbol: " + symbol);
                return historicalData;
            }

            List<String> dates = new ArrayList<>();
            timeSeriesNode.fieldNames().forEachRemaining(dates::add);

            for (String date : dates) {
                JsonNode dailyData = timeSeriesNode.get(date);

                if (dailyData == null) {
                    System.out.println("Daily data not found for date: " + date);
                    continue;
                }

                try {
                    double openPrice = Double.parseDouble(dailyData.get("1. open").asText());
                    double highPrice = Double.parseDouble(dailyData.get("2. high").asText());
                    double lowPrice = Double.parseDouble(dailyData.get("3. low").asText());
                    double closePrice = Double.parseDouble(dailyData.get("4. close").asText());

                    List<Object> dailyRecord = new ArrayList<>();
                    dailyRecord.add(date);
                    dailyRecord.add(openPrice);
                    dailyRecord.add(highPrice);
                    dailyRecord.add(lowPrice);
                    dailyRecord.add(closePrice);

                    historicalData.add(dailyRecord);
                } catch (NumberFormatException e) {
                    System.err.println("Failed to parse prices for date: " + date);
                    e.printStackTrace();
                }
            }

        } catch (JsonProcessingException e) {
            System.err.println("Error parsing JSON response for symbol: " + symbol);
            e.printStackTrace();
        }

        return historicalData;
    }

    /**
     * Get response body from the API.
     *
     * @param API_endpoint API endpoint to call.
     * @param symbol       Stock symbol.
     * @return Response body as a string.
     */
    private String getResponseBody(String API_endpoint, String symbol) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("accept", "application/json");

        HttpEntity<String> entity = new HttpEntity<>(headers);

        UriComponentsBuilder quoteUriBuilder = UriComponentsBuilder.fromHttpUrl(STOCK_API_URL)
                .queryParam("function", API_endpoint)
                .queryParam("symbol", symbol)
                .queryParam("apikey", API_KEY);

        String url = quoteUriBuilder.toUriString();

        try {
            ResponseEntity<String> response = restTemplate.exchange(url, org.springframework.http.HttpMethod.GET, entity, String.class);
            String responseBody = response.getBody();
            System.out.println(url);
            System.out.println(responseBody);

            if (responseBody == null) {
                System.out.println("ResponseBody empty: " + symbol);
                return null;
            }

            // Check for "Information" section in the response
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(responseBody);
            if (rootNode.has("Information")) {
                String information = rootNode.get("Information").asText();
                throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, information);
            }

            return responseBody;
        } catch (HttpClientErrorException e) {
            System.err.println("HTTP error: " + e.getStatusCode() + " - " + e.getResponseBodyAsString());
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "Service unavailable");
        } catch (JsonProcessingException e) {
            System.err.println("Error processing JSON response: " + e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error processing JSON response");
        }
    }
}