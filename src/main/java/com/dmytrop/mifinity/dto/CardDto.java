package com.dmytrop.mifinity.dto;

import java.util.Date;

/**
 * Card data transfer entity. It is used to send info to client or receive it
 * from client.
 */
public class CardDto {

  private String number;
  private String name;
  private Date expireDate;

  public String getNumber() {
    return number;
  }

  public void setNumber(String number) {
    this.number = number;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Date getExpireDate() {
    return expireDate;
  }

  public void setExpireDate(Date expireDate) {
    this.expireDate = expireDate;
  }
}
