package com.pn.oupia.DTO;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class FollowDTO {
    private Long id;
    
    private UserDTO follower;

    private UserDTO following;
}
