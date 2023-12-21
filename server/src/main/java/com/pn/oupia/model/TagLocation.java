package com.pn.oupia.model;

import java.io.Serializable;

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
@Table(name = "tag_location")
@NoArgsConstructor
public class TagLocation implements Serializable{
    @Id
    @Column(name = "id")
    private Long id;
    
    @Column(name = "full_location", length=300)
    private String fullLocation;

    @Column(name = "location_lat")
    private Float locationLat;

    @Column(name = "location_long")
    private Float locationLong;

    @JsonIgnore
    @JoinColumn(name = "id", referencedColumnName = "id", insertable = false, updatable = false)
    @MapsId
    @OneToOne(optional = false)
    private Post post;
}

