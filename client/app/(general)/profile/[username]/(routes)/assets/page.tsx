"use client"

import React, { useEffect } from 'react'
import AssetList from './_components/asset-list'
import { useProfileContext } from '@/contexts/profile-context';
import { notFound } from 'next/navigation';

const ProfileAssetPage = () => {

  const { userInfo } = useProfileContext();
  
  useEffect(() => { 
    if(userInfo?.role !== "ROLE_LANDLORD") {
      notFound();
    }
  }, [userInfo])

  return (
    <div className="flex flex-col gap-4 container">
      <AssetList />
    </div>
  )
}

export default ProfileAssetPage
