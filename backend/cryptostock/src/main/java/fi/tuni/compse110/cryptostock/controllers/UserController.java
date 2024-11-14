package fi.tuni.compse110.cryptostock.controllers;

import fi.tuni.compse110.cryptostock.services.UserService;
import fi.tuni.compse110.cryptostock.services.datastructures.LoginRequest;
import fi.tuni.compse110.cryptostock.services.datastructures.User;
import fi.tuni.compse110.cryptostock.services.datastructures.UserPreferences;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        String token = userService.login(loginRequest.username, loginRequest.password);
        if (token == null) {
            return new ResponseEntity<>("Invalid username or password", HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(token, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        User result = userService.register(user);
        if (result == null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @GetMapping("/preferences")
    public ResponseEntity<UserPreferences> getPreferences(@RequestHeader("Authorization") String token) {
        if (!checkToken(token)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        UserPreferences preferences = userService.getPreferences(token);
        return new ResponseEntity<>(preferences, HttpStatus.OK);
    }

    @PostMapping("/preferences")
    public ResponseEntity<UserPreferences> setPreferences(@RequestBody UserPreferences preferences, @RequestHeader("Authorization") String token) {
        if (!checkToken(token)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        UserPreferences result = userService.setPreferences(token, preferences);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<User> getUser(@RequestHeader("Authorization") String token) {
        if (!checkToken(token)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        User user = userService.getUser(token);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/user")
    public ResponseEntity<User> updateUser(@RequestBody User user, @RequestHeader("Authorization") String token) {
        if (!checkToken(token)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        User result = userService.updateUser(token, user);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    private boolean checkToken(String token) {
        return token != null && userService.isValidToken(token);
    }
}