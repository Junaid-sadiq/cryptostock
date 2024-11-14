package fi.tuni.compse110.cryptostock.services.datastructures;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Coins {
    public List<Coin> result;
    public Meta meta;

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