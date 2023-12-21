package com.pn.oupia;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import jakarta.annotation.PostConstruct;

@SpringBootApplication
public class OupiaApplication {
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public static void main(String[] args) {
        SpringApplication.run(OupiaApplication.class, args);
    }

    @PostConstruct
    public void init() {
        String pass = "Admin@123";
        String encodedPass = passwordEncoder.encode(pass);
		System.out.println("[DEBUG]");
        System.out.println(encodedPass);
    }
}
