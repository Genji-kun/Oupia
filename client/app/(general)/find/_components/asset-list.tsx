"use client"

import { Asset } from '@/interfaces/Asset';
import React, { useState } from 'react';
import AssetItem from './asset-item';

const AssetList = () => {

    const [assets, setAssets] = useState<Asset[]>([
        {
            name: "Nhà trọ Trường Chinh",
            description: "Nhà trọ giá học sinh, sinh viên, nhân viên công sở",
            slug: "nha-tro-truong-chinh",
            user: {
                name: "Võ Phú Phát",
                username: "phatvo",
                avatar: "https://res.cloudinary.com/dzba4fewa/image/upload/v1697418342/bqiphv8ijowcb1ao2w8f.jpg"
            },
            imageList: [{
                url: "https://i.pinimg.com/564x/2c/21/21/2c2121126c2da654a4a174398bff6763.jpg"
            }, {
                url: "https://i.pinimg.com/564x/70/62/6a/70626af4c5a5382d2da67efab799cc84.jpg"
            }, {
                url: "https://i.pinimg.com/564x/12/6c/bb/126cbbcf04bcd66760ce5f1e5b75e0c5.jpg"
            }, {
                url: "https://i.pinimg.com/564x/d0/e9/a5/d0e9a59259d43a23c9d7770d04efc945.jpg"
            }],
            assetType: { name: "Nhà trọ" }
        },
        {
            name: "Nhà trọ Trường Chinh",
            description: "Nhà trọ giá học sinh, sinh viên, nhân viên công sở",
            slug: "nha-tro-truong-chinh",
            user: {
                name: "Võ Phú Phát",
                username: "phatvo",
                avatar: "https://res.cloudinary.com/dzba4fewa/image/upload/v1697418342/bqiphv8ijowcb1ao2w8f.jpg"
            },
            imageList: [{
                url: "https://i.pinimg.com/564x/2c/21/21/2c2121126c2da654a4a174398bff6763.jpg"
            }, {
                url: "https://i.pinimg.com/564x/70/62/6a/70626af4c5a5382d2da67efab799cc84.jpg"
            }, {
                url: "https://i.pinimg.com/564x/12/6c/bb/126cbbcf04bcd66760ce5f1e5b75e0c5.jpg"
            }, {
                url: "https://i.pinimg.com/564x/d0/e9/a5/d0e9a59259d43a23c9d7770d04efc945.jpg"
            }],
            assetType: { name: "Nhà trọ" }
        },
        {
            name: "Nhà trọ Trường Chinh",
            description: "Nhà trọ giá học sinh, sinh viên, nhân viên công sở",
            slug: "nha-tro-truong-chinh",
            user: {
                name: "Võ Phú Phát",
                username: "phatvo",
                avatar: "https://res.cloudinary.com/dzba4fewa/image/upload/v1697418342/bqiphv8ijowcb1ao2w8f.jpg"
            },
            imageList: [{
                url: "https://i.pinimg.com/564x/2c/21/21/2c2121126c2da654a4a174398bff6763.jpg"
            }, {
                url: "https://i.pinimg.com/564x/70/62/6a/70626af4c5a5382d2da67efab799cc84.jpg"
            }, {
                url: "https://i.pinimg.com/564x/12/6c/bb/126cbbcf04bcd66760ce5f1e5b75e0c5.jpg"
            }, {
                url: "https://i.pinimg.com/564x/d0/e9/a5/d0e9a59259d43a23c9d7770d04efc945.jpg"
            }],
            assetType: { name: "Nhà trọ" }
        },
        {
            name: "Nhà trọ Trường Chinh",
            description: "Nhà trọ giá học sinh, sinh viên, nhân viên công sở",
            slug: "nha-tro-truong-chinh",
            user: {
                name: "Võ Phú Phát",
                username: "phatvo",
                avatar: "https://res.cloudinary.com/dzba4fewa/image/upload/v1697418342/bqiphv8ijowcb1ao2w8f.jpg"
            },
            imageList: [{
                url: "https://i.pinimg.com/564x/2c/21/21/2c2121126c2da654a4a174398bff6763.jpg"
            }, {
                url: "https://i.pinimg.com/564x/70/62/6a/70626af4c5a5382d2da67efab799cc84.jpg"
            }, {
                url: "https://i.pinimg.com/564x/12/6c/bb/126cbbcf04bcd66760ce5f1e5b75e0c5.jpg"
            }, {
                url: "https://i.pinimg.com/564x/d0/e9/a5/d0e9a59259d43a23c9d7770d04efc945.jpg"
            }],
            assetType: { name: "Nhà trọ" }
        }
    ]);

    return (
        <div className="grid grid-cols-4 gap-4">
            <>
                {assets.map((asset, index) => {
                    return <AssetItem key={index} asset={asset} />
                })}
            </>
        </div>
    );
};

export default AssetList;