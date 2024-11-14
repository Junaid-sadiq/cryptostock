package fi.tuni.compse110.cryptostock.controllers;

import fi.tuni.compse110.cryptostock.services.CompareDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/v1")
public class CompareController {

    @Autowired
    private CompareDataService compareDataService;

    @PostMapping("/compare")
    public Map<String, Object> compareStockAndCrypto(
            @RequestParam String stockSymbol,
            @RequestParam String coinId) {
        return compareDataService.compareStockAndCrypto(stockSymbol, coinId);
    }
}