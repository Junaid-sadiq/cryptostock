package fi.tuni.compse110.cryptostock.controllers;

import fi.tuni.compse110.cryptostock.services.CoinStatService;
import fi.tuni.compse110.cryptostock.services.datastructures.Coin;
import fi.tuni.compse110.cryptostock.services.datastructures.Coins;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/v1")
public class CoinController {

    @Autowired
    private CoinStatService coinStatService;

    private static final List<String> ALLOWED_PERIODS = Arrays.asList("24h", "1w", "1m", "3m", "6m", "1y");

    @GetMapping("/coins")
    public Coins getCoins(
            @RequestParam(defaultValue = "5") int limit,
            @RequestParam(required = false) String name,
            @RequestParam(defaultValue = "rank") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {
        return coinStatService.getCoins(limit, name, sortBy, sortDir);
    }

    @GetMapping("/coins/{id}")
    public Coin getCoinById(@PathVariable String id) {
        return coinStatService.getCoinById(id);
    }

    @GetMapping("/coins/{id}/charts")
    public List<List<Object>> getCoinChart(
            @PathVariable String id,
            @RequestParam(defaultValue = "1w") String period) {
        if (!ALLOWED_PERIODS.contains(period)) {
            throw new IllegalArgumentException("Invalid period parameter: " + period);
        }
        return coinStatService.getCoinChart(id, period);
    }
}