package com.pn.oupia.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.pn.oupia.model.Asset;

public interface AssetRepositoryJPA extends JpaRepository<Asset, Long>, JpaSpecificationExecutor<Asset>{
    
}
