package com.dmytrop.mifinity.validator;

import com.dmytrop.mifinity.dto.CardDto;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import java.util.Calendar;

@Component
public class CardValidator implements Validator {

  @Override
  public boolean supports(Class<?> clazz) {
    return CardDto.class.equals(clazz);
  }

  @Override
  public void validate(Object target, Errors errors) {
    CardDto card = (CardDto) target;
    String number = card.getNumber();
    boolean valid = number != null &&
        number.replace(" ", "").matches("[0-9]{12}");
    if (!valid) {
      errors.reject("card.number.invalid");
    }
    Calendar inOneYear = Calendar.getInstance();
    inOneYear.add(Calendar.YEAR, 1);
    if (card.getExpireDate().before(inOneYear.getTime())) {
      String key = "card.expire.date.invalid";
      errors.reject(key);
    }
    if (card.getName() == null || card.getName().isEmpty()) {
      errors.reject("card.name.is.empty");
    }
  }
}
