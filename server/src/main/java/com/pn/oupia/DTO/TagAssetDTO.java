package com.pn.oupia.DTO;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class TagAssetDTO {
    private Long id;

    private AssetDTO asset;
}
