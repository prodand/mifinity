package com.dmytrop.mifinity.entity;

import com.dmytrop.mifinity.entity.enums.Role;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Enumerated;

/**
 * User model.
 */
@Entity
public class User extends AbstractEntity {

  @Column(nullable = false, unique = true)
  private String login;
  @Column(nullable = false)
  private String password;
  @Enumerated
  @Column(nullable = false)
  private Role role;

  protected User() {
  }

  public User(String login, String password) {
    this.login = login;
    this.password = password;
    this.role = Role.REGULAR;
  }

  public String getLogin() {
    return login;
  }

  public void setLogin(String login) {
    this.login = login;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public Role getRole() {
    return role;
  }

  public void setRole(Role role) {
    this.role = role;
  }
}
