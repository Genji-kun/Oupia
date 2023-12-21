package com.pn.oupia.DTO;

import java.util.Date;
import java.util.List;

import com.pn.oupia.enums.GenderEnum;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class UserDTO {
    private Long id;
    
    private String fullName;

    private String phoneNumber;

    private GenderEnum gender;

    private Date dob;

    private Boolean isDeleted;

    private LandlordInfoDTO landlordInfo;

    private List<UserRoleDTO> userRoles;

}
