package com.dmytrop.mifinity.controller;

import org.springframework.boot.autoconfigure.web.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexController implements ErrorController {

  @Override
  public String getErrorPath() {
    return "/error";
  }

  @RequestMapping("/error")
  public String error() {
    return "index_dev.html";
  }

  @RequestMapping("/")
  public String index() {
    return "index_dev.html";
  }
}
