package com.dmytrop.mifinity.service;

import com.dmytrop.mifinity.dto.CardDto;
import com.dmytrop.mifinity.dto.UserDto;
import com.dmytrop.mifinity.entity.Card;
import com.dmytrop.mifinity.entity.User;

import org.springframework.stereotype.Service;

@Service
public class ConverterService {

  public CardDto toDto(Card card) {
    CardDto dto = new CardDto();
    dto.setNumber(card.getNumber());
    dto.setName(card.getName());
    dto.setExpireDate(card.getExpireDate());
    return dto;
  }

  public Card fromDto(CardDto dto) {
    Card card = new Card();
    card.setNumber(dto.getNumber());
    card.setName(dto.getName());
    card.setExpireDate(dto.getExpireDate());
    return card;
  }

  public UserDto toDto(User user) {
    UserDto dto = new UserDto();
    dto.setLogin(user.getLogin());
    dto.setRole(user.getRole());
    return dto;
  }
}
