package fi.tuni.compse110.cryptostock.services.datastructures;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;



import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Stocks {
    public List<Stock> stockList;
    public Meta meta;

     public Stocks() {
        stockList = new ArrayList<>();
    }

    public void add(Stock stock) {
        stockList.add(stock);
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Meta {
        public int page;
        public int limit;
        public int itemCount;
        public int pageCount;
        public boolean hasPreviousPage;
        public boolean hasNextPage;
    }
}    