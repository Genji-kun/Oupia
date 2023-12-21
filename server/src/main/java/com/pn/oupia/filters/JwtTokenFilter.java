package com.pn.oupia.filters;

import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import com.pn.oupia.components.JWTService;
import com.pn.oupia.components.OAuthAuthenticationToken;
import com.pn.oupia.service.CustomUserDetailService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtTokenFilter extends OncePerRequestFilter {

    private final static String TOKEN_HEADER = "authorization";

    @Autowired
    private JWTService jwtService;

    @Autowired
    private CustomUserDetailService userDetailsService;

    private void setAuthenticationContextByUsername(String username, HttpServletRequest request)
            throws UsernameNotFoundException, Exception {
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        if (userDetails != null) {

            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails,
                    null, userDetails.getAuthorities());
            authentication.setDetails(
                    new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
    }

    private void setAuthenticationContextBySubId(String subId, HttpServletRequest request)
            throws UsernameNotFoundException, Exception {
        UserDetails userDetails = userDetailsService.loadUserBySubId(subId);
        if (userDetails != null) {

            OAuthAuthenticationToken authentication = new OAuthAuthenticationToken(userDetails, subId,
                    null, userDetails.getAuthorities());
            authentication.setDetails(
                    new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String authToken = request.getHeader(TOKEN_HEADER);
        if (authToken != null && authToken.startsWith("Bearer ")) {
            String token = authToken.substring(7);
            String username = jwtService.getUsernameFromToken(token);
            if (username != null)
                try {
                    setAuthenticationContextByUsername(username, request);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            else {
                String subId = jwtService.getSubIdFromToken(token);
                if (subId != null)
                    try {
                        setAuthenticationContextBySubId(subId, request);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
            }
                
        }
        filterChain.doFilter(request, response);
    }
}
