package fi.tuni.compse110.cryptostock.services;

import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MockDataService {

    public List<Map<String, Object>> getComparisonChart() {
        // Return a predefined mock list of comparison data


        List<List<Object>> mockStockPrices = new ArrayList<>();
        mockStockPrices.add(Arrays.asList("2024-10-10", 175.50));
        mockStockPrices.add(Arrays.asList("2024-10-11", 178.75));
        mockStockPrices.add(Arrays.asList("2024-10-12", 180.00));
        mockStockPrices.add(Arrays.asList("2024-10-13", 182.50));
        mockStockPrices.add(Arrays.asList("2024-10-14", 185.00));

        List<List<Object>> mockCoinPrices = new ArrayList<>();
        mockCoinPrices.add(Arrays.asList("2024-10-10", 27500.00));
        mockCoinPrices.add(Arrays.asList("2024-10-11", 27800.50));
        mockCoinPrices.add(Arrays.asList("2024-10-12", 28000.75));
        mockCoinPrices.add(Arrays.asList("2024-10-13", 28250.25));
        mockCoinPrices.add(Arrays.asList("2024-10-14", 28500.50));

        List<Map<String, Object>> comparisonChart = new ArrayList<>();

        for (int i = 0; i < mockStockPrices.size(); i++) {
            String date = (String) mockStockPrices.get(i).get(0);
            Double stockPrice = (Double) mockStockPrices.get(i).get(1);
            Double coinPrice = (Double) mockCoinPrices.get(i).get(1);
    
            Map<String, Object> comparisonEntry = new HashMap<>();
            comparisonEntry.put("date", date);
            comparisonEntry.put("stockSymbol", "AAPL");
            comparisonEntry.put("coinName", "Bitcoin");
            comparisonEntry.put("stockPrice", stockPrice);
            comparisonEntry.put("coinPrice", coinPrice);
            comparisonEntry.put("difference", stockPrice - coinPrice);
            comparisonEntry.put("stockToCoinRatio", stockPrice / coinPrice);
    
            comparisonChart.add(comparisonEntry);
        }

        return comparisonChart;
    }
}