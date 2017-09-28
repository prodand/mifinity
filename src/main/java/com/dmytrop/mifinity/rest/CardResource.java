package com.dmytrop.mifinity.rest;

import com.dmytrop.mifinity.dao.CardRepository;
import com.dmytrop.mifinity.dto.CardDto;
import com.dmytrop.mifinity.entity.Card;
import com.dmytrop.mifinity.entity.User;
import com.dmytrop.mifinity.service.ConverterService;
import com.dmytrop.mifinity.validator.CardValidator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Api to manage credit cards.
 */
@RestController
@RequestMapping("api")
public class CardResource {

  private final CardRepository repository;
  private final ConverterService converter;

  @Autowired
  public CardResource(CardRepository repository, ConverterService converter) {
    this.repository = repository;
    this.converter = converter;
  }

  /**
   * Creates new credit card with given data and logged in user.
   */
  @PostMapping(value = "create", consumes = MediaType.APPLICATION_JSON_VALUE,
      produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity create(@Validated(CardValidator.class) CardDto dto) {
    Card existing = repository.findByNumber(dto.getNumber());
    if (existing != null) {
      return ResponseEntity.status(HttpStatus.CONFLICT)
          .body("Card number already exist");
    }
    Card card = converter.fromDto(dto);
    User user = (User) SecurityContextHolder.getContext().getAuthentication().getDetails();
    card.setHolder(user);
    card = repository.save(card);
    return ResponseEntity.ok(converter.toDto(card));
  }

  /**
   * Updates credit card with new expire date.
   */
  @PostMapping(value = "update", consumes = MediaType.APPLICATION_JSON_VALUE,
      produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity update(CardDto dto) {
    Card existing = repository.findByNumber(dto.getNumber());
    if (existing == null) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
          .body("Card does not exist");
    }
    existing.setExpireDate(dto.getExpireDate());
    existing = repository.save(existing);
    return ResponseEntity.ok(converter.toDto(existing));
  }
}
