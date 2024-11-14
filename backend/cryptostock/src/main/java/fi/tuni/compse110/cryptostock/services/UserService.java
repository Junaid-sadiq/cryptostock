package fi.tuni.compse110.cryptostock.services;

import fi.tuni.compse110.cryptostock.services.datastructures.User;
import fi.tuni.compse110.cryptostock.services.datastructures.UserPreferences;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {

    private Map<String, User> users = new HashMap<>();
    private Map<String, UserPreferences> preferences = new HashMap<>();
    private Map<String, String> tokens = new HashMap<>();

    public String login(String username, String password) {
        // Mock login logic
        if (users.containsKey(username) && users.get(username).password.equals(password)) {
            String token = username; // UUID.randomUUID().toString();
            tokens.put(token, username);
            return token;
        }
        return null;
    }

    public User register(User user) {
        // Mock register logic
        if (users.containsKey(user.username)) {
            return null;
        }
        // Set default language and currency
        user.language = "EN";
        user.currency = "EUR";
        users.put(user.username, user);
        // Set default preferences for new user
        UserPreferences defaultPreferences = new UserPreferences();
        defaultPreferences.favoriteCoins = new String[]{};
        defaultPreferences.favoriteStocks = new String[]{};
        preferences.put(user.username, defaultPreferences);
        return user;
    }

    public UserPreferences getPreferences(String userId) {
        // Mock get preferences logic
        return preferences.getOrDefault(userId, getDefaultPreferences());
    }

    public UserPreferences setPreferences(String userId, UserPreferences prefs) {
        // Mock set preferences logic
        UserPreferences existingPrefs = preferences.getOrDefault(userId, getDefaultPreferences());
        if (prefs.favoriteCoins != null) {
            existingPrefs.favoriteCoins = prefs.favoriteCoins;
        }
        if (prefs.favoriteStocks != null) {
            existingPrefs.favoriteStocks = prefs.favoriteStocks;
        }
        preferences.put(userId, existingPrefs);
        return existingPrefs;
    }

    public User getUser(String userId) {
        // Mock get user logic
        return users.get(userId);
    }

    public User updateUser(String userId, User user) {
        // Mock update user logic
        if (!users.containsKey(userId)) {
            return null;
        }
        User existingUser = users.get(userId);
        if (user.language != null) {
            existingUser.language = user.language;
        }
        if (user.currency != null) {
            existingUser.currency = user.currency;
        }
        users.put(userId, existingUser);
        return existingUser;
    }

    public boolean isValidToken(String token) {
        // Mock token validation logic
        return tokens.containsKey(token);
    }

    private UserPreferences getDefaultPreferences() {
        UserPreferences defaultPreferences = new UserPreferences();
        defaultPreferences.favoriteCoins = new String[]{};
        defaultPreferences.favoriteStocks = new String[]{};
        return defaultPreferences;
    }
}