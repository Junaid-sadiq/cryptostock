package fi.tuni.compse110.cryptostock.services.datastructures;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Coin {
    public String id;
    public String icon;
    public String name;
    public String symbol;
    public int rank;
    public double price;
    public double priceBtc;
    public double volume;
    public double marketCap;
    public double availableSupply;
    public double totalSupply;
    public double fullyDilutedValuation;
    public double priceChange1h;
    public double priceChange1d;
    public double priceChange1w;
    public String redditUrl;
    public String twitterUrl;
    public List<String> explorers;

    // Getter for price
    public double getPrice() {
        return price;
    }

    // Getter for name
    public String getName() {
        return name;
    }
}