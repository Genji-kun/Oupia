package com.pn.oupia.model;

import java.io.Serializable;
import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "tag_price")
@NoArgsConstructor
public class TagPrice implements Serializable{
    @Id
    @Column(name = "id")
    private Long id;
    
    @Column(name = "min_price", columnDefinition = "DECIMAL(10,3)")
    private BigDecimal minPrice;

    @Column(name = "max_price", columnDefinition = "DECIMAL(10,3)")
    private BigDecimal maxPrice;

    @JsonIgnore
    @JoinColumn(name = "id", referencedColumnName = "id", insertable = false, updatable = false)
    @MapsId
    @OneToOne(optional = false)
    private Post post;
}

