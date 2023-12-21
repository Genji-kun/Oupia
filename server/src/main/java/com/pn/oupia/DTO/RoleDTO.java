package com.pn.oupia.DTO;

import com.pn.oupia.enums.RoleEnum;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class RoleDTO {
    private int id;
    
    private RoleEnum roleName;
}
