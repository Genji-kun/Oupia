package com.pn.oupia.DTO;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class PostAmenityDTO {
    private Long id;
    
    private AmenityDTO amenity;
}
