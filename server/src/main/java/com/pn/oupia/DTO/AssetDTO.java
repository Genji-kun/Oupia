package com.pn.oupia.DTO;

import java.util.Date;
import java.util.List;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class AssetDTO {
    private Long id;

    private String assetName;

    private String assetSlug;

    private String assetDescription;

    private String fullLocation;

    private Float locationLat;

    private Float locationLong;

    private Boolean isDeleted;

    private Date createdAt;

    private Date updatedAt;

    private AssetTypeDTO assetType;

    private UserDTO user;

    private List<UnitDTO> units; 
}
