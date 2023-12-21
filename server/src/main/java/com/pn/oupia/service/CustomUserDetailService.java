package com.pn.oupia.service;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface CustomUserDetailService extends UserDetailsService{
    UserDetails loadUserBySubId(String subId) throws UsernameNotFoundException, Exception;
}
