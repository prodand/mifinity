package com.dmytrop.mifinity;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@EnableAutoConfiguration
@Configuration
@ComponentScan
public class ServerRunner {

  public static void main(String[] args) {
    SpringApplication.run(ServerRunner.class, args);
  }
}
