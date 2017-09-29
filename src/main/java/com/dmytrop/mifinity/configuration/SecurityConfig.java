package com.dmytrop.mifinity.configuration;

import com.dmytrop.mifinity.dao.UserRepository;
import com.dmytrop.mifinity.entity.enums.Role;
import com.dmytrop.mifinity.security.JpaUserDetailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;

@EnableWebSecurity
@ComponentScan(basePackages = {"com.dmytrop.mifinity.security"})
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  @Autowired
  private AuthenticationEntryPoint authenticationEntryPoint;

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.csrf().disable()
        .exceptionHandling().authenticationEntryPoint(authenticationEntryPoint)
        .and()
        .authorizeRequests()
        .antMatchers("/api/auth/login", "/api/auth/signup", "/api/user/create").permitAll()
        .antMatchers("/api/card/admin/**")
        .hasAuthority(Role.ADMIN.name())
        .antMatchers("/api/**")
        .authenticated();
  }

  @Bean
  @Autowired
  public UserDetailsService userDetailsService(UserRepository userRepository) {
    return new JpaUserDetailService(userRepository);
  }

  @Bean(name = BeanIds.AUTHENTICATION_MANAGER)
  @Override
  public AuthenticationManager authenticationManagerBean() throws Exception {
    return super.authenticationManagerBean();
  }

  @Bean
  public BCryptPasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

}