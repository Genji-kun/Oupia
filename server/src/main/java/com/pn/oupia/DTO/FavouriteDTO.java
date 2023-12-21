package com.pn.oupia.DTO;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class FavouriteDTO {
    private Long id;

    private PostDTO post;

    private UserDTO user;
}
