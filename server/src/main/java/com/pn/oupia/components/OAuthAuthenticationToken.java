package com.pn.oupia.components;

import java.util.Collection;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import lombok.Getter;

@Getter
public class OAuthAuthenticationToken extends AbstractAuthenticationToken {
    private final String subId;
    private final Object principal;
	private Object credentials;

    public OAuthAuthenticationToken(Object principal, String subId, Object credentials,
            Collection<? extends GrantedAuthority> authorities) {
        super(authorities);
        this.principal = principal;
        this.credentials = credentials;
        super.setAuthenticated(true);
        this.subId = subId;
    }

}
