package com.pn.oupia.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PostController {
    @GetMapping("/admin/posts")
    public String postList() {
        return "posts/list";
    }
}
