package fi.tuni.compse110.cryptostock.services.datastructures;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class StockOverviewResponse {
    @JsonProperty("Symbol")
    public String symbol;

    @JsonProperty("Name")
    public String fullName;

    @JsonProperty("MarketCapitalization")
    public String marketCap;

    @JsonProperty("Exchange")
    public String exchange;

    @JsonProperty("Sector")
    public String sector;
}