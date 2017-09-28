package com.dmytrop.mifinity.rest;

import com.dmytrop.mifinity.dao.UserRepository;
import com.dmytrop.mifinity.entity.User;
import com.dmytrop.mifinity.service.ConverterService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Resource to manage user accounts.
 */
@RestController
@RequestMapping("api")
public class UserResource {

  private final BCryptPasswordEncoder bCryptPasswordEncoder;
  private final UserRepository userRepository;
  private final ConverterService converter;

  @Autowired
  public UserResource(
      BCryptPasswordEncoder bCryptPasswordEncoder,
      UserRepository userRepository, ConverterService converter) {
    this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    this.userRepository = userRepository;
    this.converter = converter;
  }

  /**
   * Creates new user by with provided login and password.
   *
   * @param login Unique login
   * @param password Password for account
   * @return
   */
  @PostMapping(value = "create", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE,
      produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity create(@RequestParam("login") String login,
      @RequestParam("password") String password) {
    User existing = userRepository.findByLogin(login);
    if (existing != null) {
      return ResponseEntity.status(HttpStatus.CONFLICT)
          .body("Login already exist");
    }
    User user = new User(login, bCryptPasswordEncoder.encode(password));
    user = userRepository.save(user);
    return ResponseEntity.status(HttpStatus.CREATED).body(converter.toDto(user));
  }
}
