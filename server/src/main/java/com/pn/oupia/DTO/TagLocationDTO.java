package com.pn.oupia.DTO;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class TagLocationDTO {
    private Long id;
    
    private String fullLocation;

    private Float locationLat;

    private Float locationLong;
}
