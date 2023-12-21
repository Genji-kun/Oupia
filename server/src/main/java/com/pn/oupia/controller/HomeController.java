package com.pn.oupia.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    @GetMapping({"/admin", "/admin/"})
    public String home() {
        return "home";
    }

    @GetMapping("/admin/login")
    public String login() {
        return "login";
    }

    @GetMapping("/")
    public String redirectHome() {
        return "redirect:/admin";
    }
    
}
