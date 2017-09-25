package com.dmytrop.mifinity.entity;

import javax.persistence.Column;
import javax.persistence.Entity;

/**
 * User model.
 */
@Entity
public class User extends AbstractEntity {

  @Column(nullable = false, unique = true)
  private String login;
  @Column(nullable = false)
  private String password;

  protected User() {
  }

  public User(String login, String password) {
    this.login = login;
    this.password = password;
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
}
