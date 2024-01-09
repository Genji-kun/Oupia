"use client"

import React, { useState } from 'react';
import AssetImageList from './_components/asset-image-list';
import { Asset } from '@/interfaces/Asset';
import AssetDetail from './_components/asset-detail';
import AssetOwner from './_components/asset-owner';
import Image from 'next/image';

const AssetDetailPage = () => {

    const [asset, setAsset] = useState<Asset>({
        name: "Nhà trọ Trường Chinh",
        description: "An oceanfront oasis in Ponte Vedra Beach with direct access to a pristine stretch of white sand beaches on Florida's northeast coast. This modern 4-bedroom home has ocean views from every room, a beachfront hot tub and sits atop an elevated, quiet sand dune 1 mile away from the nearest public access point for maximum privacy and a short 15 minute drive from the historic city of St. Augustine. ",
        slug: "nha-tro-truong-chinh",
        location: "123 Trường Chinh, quận Tân Phú, thành phố Hồ Chí Minh",
        user: {
            name: "Võ Phú Phát",
            username: "phatvo",
            avatar: "https://res.cloudinary.com/dzba4fewa/image/upload/v1697418342/bqiphv8ijowcb1ao2w8f.jpg",
            phoneNumber: "09012345152"
        },
        imageList: [{
            url: "https://i.pinimg.com/564x/0d/8e/4a/0d8e4ab5b1317c7f542ed5a34c4b76f2.jpg"
        }, {
            url: "https://i.pinimg.com/564x/2c/21/21/2c2121126c2da654a4a174398bff6763.jpg"
        }, {
            url: "https://i.pinimg.com/564x/12/6c/bb/126cbbcf04bcd66760ce5f1e5b75e0c5.jpg"
        }, {
            url: "https://i.pinimg.com/564x/d0/e9/a5/d0e9a59259d43a23c9d7770d04efc945.jpg"
        }],
        assetType: { name: "Nhà trọ" },
        price: 3400000
    });

    return (
        <div className="container relative h-full w-full flex flex-col gap-6 pt-0 lg:pt-10 py-10">
            <Image src={asset.imageList[0].url} alt="Asset Image 1" width={500} height={500} className="w-full aspect-video h-full object-cover" loading='lazy' />
            <div className="hidden lg:block">
                <AssetImageList images={asset.imageList} />
            </div>
            <div className="grid grid-cols-3 gap-6 px-4">
                <div className="col-span-3 xl:col-span-2">
                    <AssetDetail asset={asset} />
                </div>
                <div className="hidden xl:flex flex-col ">
                    <div className="sticky asset-owner">
                        <AssetOwner user={asset.user} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssetDetailPage;