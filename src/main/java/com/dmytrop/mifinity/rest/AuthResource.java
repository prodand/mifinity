package com.dmytrop.mifinity.rest;

import com.dmytrop.mifinity.converter.UserConverter;
import com.dmytrop.mifinity.dao.UserRepository;
import com.dmytrop.mifinity.entity.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api")
public class AuthResource {

  private final UserRepository userRepository;
  private final BCryptPasswordEncoder bCryptPasswordEncoder;
  private final AuthenticationManager authenticationManager;
  private final UserConverter converter;

  @Autowired
  public AuthResource(UserRepository userRepository,
      BCryptPasswordEncoder bCryptPasswordEncoder,
      AuthenticationManager authenticationManager, UserConverter converter) {
    this.userRepository = userRepository;
    this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    this.authenticationManager = authenticationManager;
    this.converter = converter;
  }

  @PostMapping(path = "login",
      consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE,
      produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity login(@RequestParam("login") String login,
      @RequestParam("password") String password) {
    User user = userRepository.findByLogin(login);
    if (user == null) {
      return ResponseEntity.notFound().build();
    }
    try {
      UsernamePasswordAuthenticationToken token =
          new UsernamePasswordAuthenticationToken(login, password);
      token.setDetails(user);

      Authentication authentication = authenticationManager.authenticate(token);
      SecurityContextHolder.getContext().setAuthentication(authentication);
      return ResponseEntity.ok(converter.toDto(user));
    } catch (Exception ex) {
      SecurityContextHolder.getContext().setAuthentication(null);
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
  }
}
