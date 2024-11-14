package fi.tuni.compse110.cryptostock.services.datastructures;

public class Stock {
    public String symbol;
    public double price;
    public double volume;
    public double priceChange;
    public String fullName;
    public String marketCap;
    public String exchange;
    public String sector;

    // Getter for price
    public double getPrice() {
        return price;
    }
}