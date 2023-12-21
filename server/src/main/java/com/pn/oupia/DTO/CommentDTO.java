package com.pn.oupia.DTO;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class CommentDTO {

    private Long id;

    private PostDTO post;

    private UserDTO user;

    private String commentContent;
}
