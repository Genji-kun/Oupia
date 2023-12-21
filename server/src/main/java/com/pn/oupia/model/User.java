package com.pn.oupia.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pn.oupia.enums.GenderEnum;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Entity
@Table(name = "user")
@NoArgsConstructor
public class User implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    
    @Column(name = "full_name", length=50)
    private String fullName;

    @Column(name = "phone_number", length=12)
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender", length=10)
    private GenderEnum gender;

    @Column(name = "dob")
    private Date dob;

    @Column(name = "is_deleted")
    private Boolean isDeleted;

    @OneToOne(cascade = { CascadeType.PERSIST, CascadeType.REMOVE }, mappedBy = "user")
    private Account account;

    @OneToOne(cascade = { CascadeType.PERSIST, CascadeType.REMOVE }, mappedBy = "user")
    private LandlordInfo landlordInfo;

    @JsonIgnore
    @OneToMany(cascade = { CascadeType.PERSIST, CascadeType.REMOVE }, mappedBy = "user")
    private List<UserRole> userRoles;

    @JsonIgnore
    @OneToMany(cascade = { CascadeType.PERSIST, CascadeType.REMOVE }, mappedBy = "user")
    private List<OAuth> oauths;

    @JsonIgnore
    @OneToMany(cascade = { CascadeType.PERSIST, CascadeType.REMOVE }, mappedBy = "user")
    private List<Favourite> favourites;

    @JsonIgnore
    @OneToMany(cascade = { CascadeType.PERSIST, CascadeType.REMOVE }, mappedBy = "user")
    private List<Comment> comments;

    @JsonIgnore
    @OneToMany(cascade = { CascadeType.PERSIST, CascadeType.REMOVE }, mappedBy = "user")
    private List<Asset> assets;

    @JsonIgnore
    @OneToMany(cascade = { CascadeType.PERSIST, CascadeType.REMOVE }, mappedBy = "follower")
    private List<Follow> FollowingList;

    @JsonIgnore
    @OneToMany(cascade = { CascadeType.PERSIST, CascadeType.REMOVE }, mappedBy = "following")
    private List<Follow> FollowerList;
}
