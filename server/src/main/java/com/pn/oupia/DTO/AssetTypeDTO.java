package com.pn.oupia.DTO;

import com.pn.oupia.enums.AssetTypeEnum;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class AssetTypeDTO {
    private int id;
    private AssetTypeEnum assetTypeName;
}
