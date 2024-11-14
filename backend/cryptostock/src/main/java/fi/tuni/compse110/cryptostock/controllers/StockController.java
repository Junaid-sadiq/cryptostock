package fi.tuni.compse110.cryptostock.controllers;

import fi.tuni.compse110.cryptostock.services.StockStatService;
import fi.tuni.compse110.cryptostock.services.datastructures.Stock;
import fi.tuni.compse110.cryptostock.services.datastructures.Stocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/v1")
public class StockController {

    @Autowired
    private StockStatService stockStatService;

    @GetMapping("/stocks")
    public Stocks getStocks(
            @RequestParam(required = true) String symbols[],
            @RequestParam(defaultValue = "5") int limit) {
        return stockStatService.getStocks(symbols, limit);
    }

    @GetMapping("/stocks/{symbol}")
    public Stock getStockBySymbol(@PathVariable String symbol) {
        return stockStatService.getStockBySymbol(symbol);
    }

    @GetMapping("/stockNames")
    public List<String> getStockNames(@RequestParam(required = false) String symbols[],
                                      @RequestParam(defaultValue = "5") int limit) {
        return stockStatService.getStockNames(symbols, limit);
    }

    // TODO: add period for which to get history.
    @GetMapping("/stocks/{symbol}/history")
    public List<List<Object>> getHistoricalPrices(@PathVariable String symbol) {
        return stockStatService.getHistoricalPrices(symbol);
    }
}

