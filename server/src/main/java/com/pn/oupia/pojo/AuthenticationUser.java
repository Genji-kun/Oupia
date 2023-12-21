package com.pn.oupia.pojo;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthenticationUser extends org.springframework.security.core.userdetails.User{

    private Long id;
    private String subId;
    private String fullName;
    private String email;
    
    public AuthenticationUser(Collection<? extends GrantedAuthority> authorities) {
        super(null, null, authorities);
    }

    public AuthenticationUser(String username, String password, Collection<? extends GrantedAuthority> authorities) {
        super(username, password, authorities);
    }

    public AuthenticationUser(String username, String password, boolean enabled, boolean accountNonExpired,
            boolean credentialsNonExpired, boolean accountNonLocked,
            Collection<? extends GrantedAuthority> authorities) {
        super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);
    }
}
