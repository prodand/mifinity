package com.dmytrop.mifinity.dao;

import com.dmytrop.mifinity.entity.Card;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CardRepository extends CrudRepository<Card, Long> {

  /**
   * Retrieve card by its full number.
   * @param number Card number
   * @return
   */
  @Query("select c from Card c where c.number = ?1")
  Card findByNumber(String number);

  /**
   * Searches cards by number or part of the number and for particular card holder.
   *
   * @param query Card number or its part
   * @return
   */
  @Query("select c from Card c where c.number like ?1 and c.holder.login = ?2")
  List<Card> searchByNumber(String query, String holderLogin);

  /**
   * Searches cards by number or part of the number within any holder.
   *
   * @param query Card number or its part
   * @return
   */
  @Query("select c from Card c where c.number like ?1")
  List<Card> searchByNumber(String query);
}
