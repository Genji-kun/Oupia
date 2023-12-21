package com.pn.oupia.DTO;

import java.math.BigDecimal;
import java.util.List;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class UnitDTO {
    private Long id;

    private String unitName;

    private BigDecimal price;

    private Double area;

    private MaxPeopleDTO maxPeople;

    private List<UnitAmenityDTO> unitAmenities;

    private List<UnitImageDTO> unitImages;
}
