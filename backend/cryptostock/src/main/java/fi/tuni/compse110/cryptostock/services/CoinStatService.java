package fi.tuni.compse110.cryptostock.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import fi.tuni.compse110.cryptostock.services.datastructures.Coin;
import fi.tuni.compse110.cryptostock.services.datastructures.Coins;

import java.util.List;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

/**
 * Service to fetch coin statistics from Coin API.
 */
@Service
public class CoinStatService {
    private static final String COIN_API_URL = "https://openapiv1.coinstats.app/coins";
    private static final String API_KEY = "fCpQSEP4eyd9xTHOjDoluEorMImSHoYKlPoLjd7oggI=";
    private static final String CURRENCY = "EUR"; // TODO: get it from the user preferences;

    public Coins getCoins(int limit, String name, String sortBy, String sortDir) {
        RestTemplate restTemplate = new RestTemplate();

        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(COIN_API_URL)
                .queryParam("limit", limit)
                .queryParam("sortBy", sortBy)
                .queryParam("sortDir", sortDir)
                .queryParam("currency", CURRENCY);

        if (name != null && !name.isEmpty()) {
            uriBuilder.queryParam("name", name);
        }

        String url = uriBuilder.toUriString();

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-API-KEY", API_KEY);
        headers.set("accept", "application/json");

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(url, org.springframework.http.HttpMethod.GET, entity, String.class);
        String responseBody = response.getBody();

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(responseBody, Coins.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace(); // Print the stack trace for debugging
            System.err.println("Error processing JSON: " + e.getMessage()); // Print the error message
            return null;
        }
    }

    public Coin getCoinById(String coinId) {
        RestTemplate restTemplate = new RestTemplate();

        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(COIN_API_URL + "/" + coinId)
                .queryParam("currency", CURRENCY);

        String url = uriBuilder.toUriString();

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-API-KEY", API_KEY);
        headers.set("accept", "application/json");

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(url, org.springframework.http.HttpMethod.GET, entity, String.class);
        String responseBody = response.getBody();

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(responseBody, Coin.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace(); // Print the stack trace for debugging
            System.err.println("Error processing JSON: " + e.getMessage()); // Print the error message
            return null;
        }
    }

    public List<List<Object>> getCoinChart(String coinId, String period) {
        RestTemplate restTemplate = new RestTemplate();

        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(COIN_API_URL + "/" + coinId + "/charts")
                .queryParam("period", period);

        String url = uriBuilder.toUriString();

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-API-KEY", API_KEY);
        headers.set("accept", "application/json");

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(url, org.springframework.http.HttpMethod.GET, entity, String.class);
        String responseBody = response.getBody();

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(responseBody, List.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace(); // Print the stack trace for debugging
            System.err.println("Error processing JSON: " + e.getMessage()); // Print the error message
            return null;
        }
    }
}