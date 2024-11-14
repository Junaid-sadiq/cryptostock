package fi.tuni.compse110.cryptostock.controllers;

import fi.tuni.compse110.cryptostock.services.MockDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/v1")
public class StatisticsController {


    // TODO: add implementation with actual HTTP response JSON data instead of mock data.
    @Autowired
    private MockDataService MockDataService;

    @GetMapping("/comparisonChart")
    public List<Map<String, Object>> getComparisonChart(
        ) 
            {

        return MockDataService.getComparisonChart();
    }
}
