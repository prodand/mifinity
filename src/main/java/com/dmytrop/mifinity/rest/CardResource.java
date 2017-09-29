package com.dmytrop.mifinity.rest;

import com.dmytrop.mifinity.dao.CardRepository;
import com.dmytrop.mifinity.dto.CardDto;
import com.dmytrop.mifinity.entity.Card;
import com.dmytrop.mifinity.entity.User;
import com.dmytrop.mifinity.service.ConverterService;
import com.dmytrop.mifinity.utils.Utils;
import com.dmytrop.mifinity.validator.CardValidator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Calendar;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * Api to manage credit cards.
 */
@RestController
@RequestMapping("api/card")
public class CardResource {

  private final CardRepository repository;
  private final ConverterService converter;
  private final CardValidator cardValidator;
  private final MessageSource messageSource;

  @Autowired
  public CardResource(CardRepository repository, ConverterService converter,
      CardValidator cardValidator, MessageSource messageSource) {
    this.repository = repository;
    this.converter = converter;
    this.cardValidator = cardValidator;
    this.messageSource = messageSource;
  }

  @InitBinder
  protected void initBinder(WebDataBinder binder) {
    binder.addValidators(cardValidator);
  }

  /**
   * Creates new credit card with given data and logged in user.
   */
  @PostMapping(path = "create", consumes = MediaType.APPLICATION_JSON_VALUE,
      produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity create(@Validated @RequestBody CardDto dto, BindingResult result) {
    if (result.hasErrors()) {
      List<String> errors = result.getAllErrors().stream()
          .map(objectError -> messageSource.getMessage(objectError.getCode(), new Object[]{}, null))
          .collect(Collectors.toList());
      return ResponseEntity.status(HttpStatus.PRECONDITION_FAILED).body(errors);
    }
    Card existing = repository.findByNumber(dto.getNumber());
    if (existing != null) {
      return ResponseEntity.status(HttpStatus.CONFLICT)
          .body("Card number already exist");
    }
    // Setup date to the first day of the year.
    Calendar expireDate = Calendar.getInstance();
    expireDate.setTime(dto.getExpireDate());
    expireDate.set(Calendar.DAY_OF_MONTH, 0);

    dto.setExpireDate(expireDate.getTime());
    Card card = converter.fromDto(dto);

    User user = Utils.getCurrentUser();
    card.setHolder(user);
    card = repository.save(card);
    return ResponseEntity.ok(converter.toDto(card));
  }

  /**
   * Updates credit card with new expire date.
   */
  @PostMapping(path = "update", consumes = MediaType.APPLICATION_JSON_VALUE,
      produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity update(CardDto dto) {
    Card existing = repository.findByNumber(dto.getNumber());
    if (existing == null) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
          .body("Card does not exist");
    }
    User user = Utils.getCurrentUser();
    if (!Objects.equals(existing.getHolder().getLogin(), user.getLogin())) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
    existing.setExpireDate(dto.getExpireDate());
    existing = repository.save(existing);
    return ResponseEntity.ok(converter.toDto(existing));
  }

  @GetMapping(path = "list")
  public ResponseEntity findByNumber(@RequestParam("number") String number) {
    User user = Utils.getCurrentUser();
    List<Card> cardList = repository.searchByNumber("%" + number + "%", user.getLogin());
    return ResponseEntity.ok(cardList);
  }
}
