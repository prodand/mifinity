package com.dmytrop.mifinity;

import com.dmytrop.mifinity.entity.enums.Role;

public class UserDto {

  private String login;
  private Role role;

  public String getLogin() {
    return login;
  }

  public void setLogin(String login) {
    this.login = login;
  }

  public Role getRole() {
    return role;
  }

  public void setRole(Role role) {
    this.role = role;
  }
}
