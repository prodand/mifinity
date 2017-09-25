package com.dmytrop.mifinity.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

/**
 * Credit card model.
 */
@Entity
public class Card extends AbstractEntity {

  @Column(nullable = false, unique = true)
  private String number;
  @Column(nullable = false)
  private String name;
  @Column(nullable = false)
  private Date expireDate;
  @ManyToOne(optional = false)
  private User holder;

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

  public User getHolder() {
    return holder;
  }

  public void setHolder(User holder) {
    this.holder = holder;
  }
}
