package com.pn.oupia.components;

import java.text.ParseException;
import java.util.Date;

import org.springframework.stereotype.Service;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSSigner;
import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;

@Service
public class JWTService {
    private static final String SECRECT = "eqwen1ki3248b3283yrbf823ubb328grbug2ug8hfgh84rfubru81r3i2ubg4h9";
    private static final long EXPIRE_DURATION = 604800;
    private static final byte[] BYTES = SECRECT.getBytes();

    private SignedJWT createSignedJWT(String claimName, String value) throws JOSEException {
        JWSSigner signer;
        signer = new MACSigner(BYTES);
        JWTClaimsSet.Builder builder = new JWTClaimsSet.Builder();
        builder.claim(claimName, value);
        builder.issueTime(new Date(System.currentTimeMillis()));
        builder.expirationTime(new Date(System.currentTimeMillis() + EXPIRE_DURATION));

        JWTClaimsSet claimsSet = builder.build();
        SignedJWT signedJWT = new SignedJWT(new JWSHeader(JWSAlgorithm.HS256), claimsSet);
        signedJWT.sign(signer);
        return signedJWT;
    }

    public String generateTokenFromUsername(String username) {
        String token = null;
        if (username != null) {
            try {
                token = createSignedJWT("username", username).serialize();

            } catch (JOSEException e) {
                System.out.println("[ERROR] - " + e.getMessage());
            }
        }
        return token;
    }

    public String generateTokenFromSubId(String subId) {
        String token = null;
        if (subId != null) {
            try {
                token = createSignedJWT("subId", subId).serialize();

            } catch (JOSEException e) {
                System.out.println("[ERROR] - " + e.getMessage());
            }
        }
        return token;
    }

    private JWTClaimsSet getClaimsSet(String token) {
        JWTClaimsSet claimsSet = null;
        try {
            SignedJWT signedJWT = SignedJWT.parse(token);
            JWSVerifier verifier = null;
            verifier = new MACVerifier(BYTES);

            if (signedJWT.verify(verifier)) {
                claimsSet = signedJWT.getJWTClaimsSet();
            }
        } catch (JOSEException | ParseException | NullPointerException e) {
            System.out.println("[ERROR] - JwtService Error: " + e.getMessage());
        }
        return claimsSet;
    }

    public String getUsernameFromToken(String token) {
        JWTClaimsSet claimsSet = getClaimsSet(token);
        String value = null;
        try {
            value = claimsSet.getStringClaim("username");
        } catch (ParseException | NullPointerException e) {
            System.out.println("[ERROR] - " + e.getMessage());
        }
        return value;
    }

    public String getSubIdFromToken(String token) {
        JWTClaimsSet claimsSet = getClaimsSet(token);
        String value = null;
        try {
            value = claimsSet.getStringClaim("subId");
        } catch (ParseException | NullPointerException e) {
            System.out.println("[ERROR] - " + e.getMessage());
        }
        return value;
    }
}
