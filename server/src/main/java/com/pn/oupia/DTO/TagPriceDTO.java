package com.pn.oupia.DTO;

import java.math.BigDecimal;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class TagPriceDTO {
    private Long id;
    
    private BigDecimal minPrice;

    private BigDecimal maxPrice;
}
