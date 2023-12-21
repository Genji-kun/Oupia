package com.pn.oupia.model;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "tag_asset")
@NoArgsConstructor
public class TagAsset implements Serializable{
    @Id
    @Column(name = "id")
    private Long id;
    
    @JoinColumn(name = "asset_id", referencedColumnName = "id")
    @ManyToOne(cascade = CascadeType.PERSIST)
    private Asset asset;

    @JsonIgnore
    @JoinColumn(name = "id", referencedColumnName = "id", insertable = false, updatable = false)
    @MapsId
    @OneToOne(optional = false)
    private Post post;
}

