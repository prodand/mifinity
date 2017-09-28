package com.dmytrop.mifinity.utils;

import com.dmytrop.mifinity.entity.User;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 * Utility functions.
 */
public final class Utils {

  private Utils() {
  }

  /**
   * Retrieves currently logged in User if any.
   * @throws IllegalStateException If there is no user's session.
   * @return
   */
  public static User getCurrentUser() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication == null) {
      throw new IllegalStateException("User is not logged in");
    }
    return (User) authentication.getDetails();
  }
}
