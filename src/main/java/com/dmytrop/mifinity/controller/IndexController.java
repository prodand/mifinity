package com.dmytrop.mifinity.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.web.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexController implements ErrorController {

  @Value(value = "${index.file}")
  private String indexFile;

  @Override
  public String getErrorPath() {
    return "/error";
  }

  @RequestMapping("/error")
  public String error() {
    return indexFile;
  }

  @RequestMapping("/")
  public String index() {
    return indexFile;
  }
}
