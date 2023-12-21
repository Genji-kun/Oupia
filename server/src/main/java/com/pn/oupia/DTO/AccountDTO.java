package com.pn.oupia.DTO;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class AccountDTO {
    private Long id;

    private String username;

    private String password;
}
