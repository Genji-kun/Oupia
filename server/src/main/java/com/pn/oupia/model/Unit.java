package com.pn.oupia.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "unit")
@NoArgsConstructor
public class Unit implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "unit_name", length = 255)
    private String unitName;

    @Column(name = "price", columnDefinition = "DECIMAL(10,3)")
    private BigDecimal price;

    @Column(name = "area")
    private Double area;

    @JoinColumn(name = "asset_id", referencedColumnName = "id")
    @ManyToOne(cascade = CascadeType.PERSIST)
    private Asset asset;

    @OneToOne(cascade = { CascadeType.PERSIST, CascadeType.REMOVE }, mappedBy = "unit")
    private MaxPeople maxPeople;

    @OneToMany(cascade = { CascadeType.PERSIST, CascadeType.REMOVE }, mappedBy = "unit")
    private List<UnitAmenity> unitAmenities;

    @OneToMany(cascade = { CascadeType.PERSIST, CascadeType.REMOVE }, mappedBy = "unit")
    private List<UnitImage> unitImages;
}
