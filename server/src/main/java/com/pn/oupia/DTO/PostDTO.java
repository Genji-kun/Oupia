package com.pn.oupia.DTO;

import java.util.List;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class PostDTO {
    private Long id;
    
    private String postContent;

    private Boolean isDeleted;

    private TagAssetDTO tagAsset;

    private TagLocationDTO tagLocation;

    private TagPriceDTO tagPrice;

    private List<PostAmenityDTO> postAmenities;

    private List<PostImageDTO> postImages;
}
