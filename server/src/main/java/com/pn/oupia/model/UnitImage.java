package com.pn.oupia.model;

import java.io.Serializable;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "unit_image")
@NoArgsConstructor
public class UnitImage implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    
    @JoinColumn(name = "unit_id", referencedColumnName = "id")
    @ManyToOne(cascade = CascadeType.PERSIST)
    private Unit unit;

    @JoinColumn(name = "image_id", referencedColumnName = "id")
    @ManyToOne(cascade = CascadeType.PERSIST)
    private Image image;
}
