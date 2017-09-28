package com.dmytrop.mifinity.dao;

import com.dmytrop.mifinity.entity.Card;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface CardRepository extends CrudRepository<Card, Long> {

  @Query("select c from Card c where c.number = ?1")
  Card findByNumber(String number);
}
