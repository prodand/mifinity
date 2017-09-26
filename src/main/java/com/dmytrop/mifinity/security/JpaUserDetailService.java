package com.dmytrop.mifinity.security;

import com.dmytrop.mifinity.dao.UserRepository;
import com.dmytrop.mifinity.entity.User;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Collections;

public class JpaUserDetailService implements UserDetailsService {

  private final UserRepository userRepository;

  public JpaUserDetailService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public UserDetails loadUserByUsername(String username)
      throws UsernameNotFoundException {
    User user = userRepository.findByLogin(username);
    if (user == null) {
      throw new UsernameNotFoundException("User no found");
    }
    return new org.springframework.security.core.userdetails.User(
        user.getLogin(),
        user.getPassword(), Collections
        .singletonList(new SimpleGrantedAuthority(user.getRole().name())));
  }
}