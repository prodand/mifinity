package com.dmytrop.mifinity.converter;

import com.dmytrop.mifinity.UserDto;
import com.dmytrop.mifinity.entity.User;

import org.springframework.stereotype.Service;

@Service
public class UserConverter {

  public UserDto toDto(User user) {
    UserDto dto = new UserDto();
    dto.setLogin(user.getLogin());
    dto.setRole(user.getRole());
    return dto;
  }

}
