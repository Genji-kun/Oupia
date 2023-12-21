package com.pn.oupia.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.pn.oupia.model.Account;
import com.pn.oupia.model.User;

@Controller
public class UserController {
    @GetMapping("/admin/users")
    public String userList() {
        return "users/list";
    }

    @GetMapping("/admin/users/add")
    public String addUser(Model model) {
        User user = new User();
        Account account = new Account();
        user.setAccount(account);
        model.addAttribute("user", user);
        return "users/add";
    }

    @PostMapping("/admin/users/add")
    public String addUser(Model model) {
        User user = new User();
        Account account = new Account();
        user.setAccount(account);
        model.addAttribute("user", user);
        return "users/add";
    }
}
