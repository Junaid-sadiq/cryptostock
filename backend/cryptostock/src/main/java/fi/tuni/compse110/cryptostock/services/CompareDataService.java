package fi.tuni.compse110.cryptostock.services;

import fi.tuni.compse110.cryptostock.services.datastructures.Coin;
import fi.tuni.compse110.cryptostock.services.datastructures.Stock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class CompareDataService {

    @Autowired
    private StockStatService stockStatService;

    @Autowired
    private CoinStatService coinStatService;

    public Map<String, Object> compareStockAndCrypto(String stockSymbol, String coinId) {
        Stock stock = stockStatService.getStockBySymbol(stockSymbol);
        Coin coin = coinStatService.getCoinById(coinId);

        if (stock == null || coin == null) {
            throw new IllegalArgumentException("Invalid stock symbol or coin ID");
        }

        Map<String, Object> comparisonData = new HashMap<>();
        comparisonData.put("stockSymbol", stockSymbol);
        comparisonData.put("coinName", coin.name);
        comparisonData.put("stockPrice", stock.price);
        comparisonData.put("coinPrice", coin.price);
        comparisonData.put("stockToCoinRatio", stock.price / coin.price);

        return comparisonData;
    }
}

