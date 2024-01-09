"use client"

import { Asset } from '@/interfaces/Asset';
import React, { useState } from 'react';
import AssetItem from './asset-item';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToggleContext } from '@/contexts/toggle-search-context';
import { cn } from '@/lib/utils';

const AssetList = () => {

    const { openMap } = useToggleContext();

    const [assets, setAssets] = useState<Asset[]>([
        {
            name: "Nhà trọ Trường Chinh",
            description: "Nhà trọ giá học sinh, sinh viên, nhân viên công sở",
            slug: "nha-tro-truong-chinh",
            location: "123 Trường Chinh, quận Tân Phú, thành phố Hồ Chí Minh",
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
            assetType: { name: "Nhà trọ" },
            price: 3400000
        },
        {
            name: "Nhà trọ Trường Chinh",
            description: "Nhà trọ giá học sinh, sinh viên, nhân viên công sở",
            slug: "nha-tro-truong-chinh",
            location: "123 Trường Chinh, quận Tân Phú, thành phố Hồ Chí Minh",
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
            assetType: { name: "Nhà trọ" },
            price: 2300000
        },
        {
            name: "Nhà trọ Trường Chinh",
            description: "Nhà trọ giá học sinh, sinh viên, nhân viên công sở",
            slug: "nha-tro-truong-chinh",
            location: "123 Trường Chinh, quận Tân Phú, thành phố Hồ Chí Minh",
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
            assetType: { name: "Nhà trọ" },
            price: 2300000
        },
        {
            name: "Nhà trọ Trường Chinh",
            description: "Nhà trọ giá học sinh, sinh viên, nhân viên công sở",
            slug: "nha-tro-truong-chinh",
            location: "123 Trường Chinh, quận Tân Phú, thành phố Hồ Chí Minh",
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
            assetType: { name: "Nhà trọ" },
            price: 3000000
        },
        {
            name: "Nhà trọ Trường Chinh",
            description: "Nhà trọ giá học sinh, sinh viên, nhân viên công sở",
            slug: "nha-tro-truong-chinh",
            location: "123 Trường Chinh, quận Tân Phú, thành phố Hồ Chí Minh",
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
            assetType: { name: "Nhà trọ" },
            price: 1500000
        },
        {
            name: "Nhà trọ Trường Chinh",
            description: "Nhà trọ giá học sinh, sinh viên, nhân viên công sở",
            slug: "nha-tro-truong-chinh",
            location: "123 Trường Chinh, quận Tân Phú, thành phố Hồ Chí Minh",
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
            assetType: { name: "Nhà trọ" },
            price: 13500000
        },
        {
            name: "Nhà trọ Trường Chinh",
            description: "Nhà trọ giá học sinh, sinh viên, nhân viên công sở",
            slug: "nha-tro-truong-chinh",
            location: "123 Trường Chinh, quận Tân Phú, thành phố Hồ Chí Minh",
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
            assetType: { name: "Nhà trọ" },
            price: 2300000
        },
        {
            name: "Nhà trọ Trường Chinh",
            description: "Nhà trọ giá học sinh, sinh viên, nhân viên công sở",
            slug: "nha-tro-truong-chinh",
            location: "123 Trường Chinh, quận Tân Phú, thành phố Hồ Chí Minh",
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
            assetType: { name: "Nhà trọ" },
            price: 1700000
        },
    ]);

    return (
        <>
            <div className={cn("flex flex-col gap-4 ")}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    <>
                        {assets.map((asset, index) => {
                            return <AssetItem key={index} asset={asset} />
                        })}
                    </>
                </div>
                <div className="pb-4 w-full gap-x-4 gap-y-2 flex flex-wrap items-center justify-center">
                    <Pagination className="w-fit m-0">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" isActive>
                                    2
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">3</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href="#" />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                    <div className="flex items-center gap-x-2 flex-shrink-0">
                        <span>Hiện</span>
                        <Select>
                            <SelectTrigger className="w-fit">
                                <SelectValue defaultChecked />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="8">8</SelectItem>
                                    <SelectItem value="16">16</SelectItem>
                                    <SelectItem value="24">24</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                            <span>thành phần trong một trang</span>
                        </Select>
                    </div>
                </div >
            </div >
        </>
    );
};

export default AssetList;