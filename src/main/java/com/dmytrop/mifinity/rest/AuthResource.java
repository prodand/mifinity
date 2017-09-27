package com.dmytrop.mifinity.rest;

import com.dmytrop.mifinity.converter.UserConverter;
import com.dmytrop.mifinity.dao.UserRepository;
import com.dmytrop.mifinity.dto.UserDto;
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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Authentication endpoints.
 */
@RestController
@RequestMapping("api")
public class AuthResource {

  private final UserRepository userRepository;
  private final AuthenticationManager authenticationManager;
  private final UserConverter converter;

  @Autowired
  public AuthResource(UserRepository userRepository,
      BCryptPasswordEncoder bCryptPasswordEncoder,
      AuthenticationManager authenticationManager, UserConverter converter) {
    this.userRepository = userRepository;
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

  /**
   * Resource to check if client has session and he is logged in.
   * @return Authenticated user info.
   */
  @GetMapping(value = "ping")
  public ResponseEntity<UserDto> ping() {
    User user = (User) SecurityContextHolder.getContext().getAuthentication().getDetails();
    return ResponseEntity.ok(converter.toDto(user));
  }
}
