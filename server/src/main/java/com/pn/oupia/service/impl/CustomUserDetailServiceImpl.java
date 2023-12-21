package com.pn.oupia.service.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.pn.oupia.model.Account;
import com.pn.oupia.model.OAuth;
import com.pn.oupia.model.UserRole;
import com.pn.oupia.pojo.AuthenticationUser;
import com.pn.oupia.repository.AccountRepositoryJPA;
import com.pn.oupia.repository.OAuthRepositoryJPA;
import com.pn.oupia.repository.UserRoleRepositoryJPA;
import com.pn.oupia.service.CustomUserDetailService;

@Service
public class CustomUserDetailServiceImpl implements CustomUserDetailService{
   
    @Autowired
    private AccountRepositoryJPA accountRepository;

    @Autowired
    private OAuthRepositoryJPA oauthRepository;

    @Autowired
    private UserRoleRepositoryJPA userRoleRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account = accountRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Set<GrantedAuthority> authorities = new HashSet<>();
        List<UserRole> roles = userRoleRepository.findByUserId(account.getUser().getId());
        
        roles.forEach(ur -> {
            authorities.add(new SimpleGrantedAuthority(ur.getRole().getRoleName().toString()));
        });

        return createAuthenticationUser(account, authorities);

    }

    @Override
    public UserDetails loadUserBySubId(String subId) throws UsernameNotFoundException, Exception {
        OAuth oauth = oauthRepository.findBySubId(subId).orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Set<GrantedAuthority> authorities = new HashSet<>();
        List<UserRole> roles = userRoleRepository.findByUserId(oauth.getUser().getId());
        
        roles.forEach(ur -> {
            authorities.add(new SimpleGrantedAuthority(ur.getRole().getRoleName().toString()));
        });

        return createAuthenticationUserWithOAuth(oauth, authorities);
    }

    private AuthenticationUser createAuthenticationUser(Account account, Set<GrantedAuthority> authorities) {
        AuthenticationUser authenticationUser = new AuthenticationUser(account.getUsername(), account.getPassword(), authorities);
        authenticationUser.setId(account.getId());
        authenticationUser.setFullName(account.getUser().getFullName());
        return authenticationUser;
    }

    private AuthenticationUser createAuthenticationUserWithOAuth(OAuth oauth, Set<GrantedAuthority> authorities) {
        AuthenticationUser authenticationUser = new AuthenticationUser(null, null, authorities);
        authenticationUser.setId(oauth.getId());
        authenticationUser.setFullName(oauth.getUser().getFullName());
        authenticationUser.setSubId(oauth.getSubId());
        return authenticationUser;
    }
    
}
