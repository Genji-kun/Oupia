package com.pn.oupia.DTO;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class PostImageDTO {
    
    private Long id;

    private ImageDTO image;
}
