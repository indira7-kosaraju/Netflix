package com.backend.netflixbackend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.netflixbackend.service.UserService;
import com.backend.netflixbackend.entity.User;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.CreateUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {

        Optional<User> user = userService.loginUser(
            loginRequest.getEmail(),
            loginRequest.getPassword()
        );

        if (user.isPresent()) {

            User loggedInUser = user.get();

            Map<String, Object> userData = Map.of(
                "id", loggedInUser.getId(),
                "name", loggedInUser.getName(),
                "email", loggedInUser.getEmail()
            );

            return ResponseEntity.ok(
                Map.of(
                    "message", "Login successful",
                    "user", userData
                )
            );
        }

        return ResponseEntity
            .status(401)
            .body(Map.of("message", "Invalid email or password"));
    }

    @GetMapping
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public Optional<User> getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }
}