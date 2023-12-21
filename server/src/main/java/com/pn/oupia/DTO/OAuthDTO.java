package com.pn.oupia.DTO;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class OAuthDTO {
    private Long id;

    private String subId;
    
    private ProviderDTO provider;
}
