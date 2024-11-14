package fi.tuni.compse110.cryptostock.services.datastructures;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class GlobalQuoteResponse {
    @JsonProperty("Global Quote")
    public GlobalQuote globalQuote;

    public String information;

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class GlobalQuote {
        @JsonProperty("01. symbol")
        public String symbol;

        @JsonProperty("05. price")
        public double price;

        @JsonProperty("06. volume")
        public double volume;

        @JsonProperty("09. change")
        public double priceChange;
    }
}