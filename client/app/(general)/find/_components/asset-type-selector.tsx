"use client"

import { Label } from '@/components/ui/label';
import { changeFilter } from '@/redux/slices/assetFilterSlice';
import { RootState } from '@/redux/store';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AssetTypeSelector = () => {
    const dispatch = useDispatch();

    const assetType = useSelector((state: RootState) => state.assetFilterSlice.assetType);

    const handleCheckboxChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const assetTypeValue = evt.target.id;
        const isChecked = evt.target.checked;

        if (isChecked) {
            dispatch(changeFilter({ assetType: [...assetType, assetTypeValue] }));
        } else {
            dispatch(changeFilter({ assetType: assetType.filter(value => value !== assetTypeValue) }));
        }
    };

    useEffect(() => {
        console.log(assetType);
    }, [assetType]);


    return (
        <div className="flex flex-col gap-y-4">
            <h2 className="font-semibold text-lg">Loại hình căn hộ</h2>
            <div className="flex flex-col gap-y-4">
                <div className="flex gap-x-2 items-center">
                    <input type='checkbox'
                        className="border-border" id="all"
                        onChange={(evt) => { handleCheckboxChange(evt) }} />
                    <Label htmlFor='all'>Tất cả</Label>
                    <span className="ml-auto text-sm">46</span>
                </div>
                <div className="flex gap-x-2 items-center">
                    <input type='checkbox'
                        className="border-border" id="boarding-house"
                        onChange={(evt) => { handleCheckboxChange(evt) }} />
                    <Label htmlFor='boarding-house'>Dãy trọ</Label>
                    <span className="ml-auto text-sm">1</span>
                </div>
                <div className="flex gap-x-2 items-center">
                    <input type='checkbox' onChange={(evt) => { handleCheckboxChange(evt) }} className="border-border" id="shared-housing-system" />
                    <Label htmlFor='shared-housing-system'>Hệ thống nhà chung</Label>
                    <span className="ml-auto text-sm">3</span>
                </div>
                <div className="flex gap-x-2 items-center">
                    <input type='checkbox' onChange={(evt) => { handleCheckboxChange(evt) }} className="border-border" id="apartment" />
                    <Label htmlFor='apartment'>Chung cư</Label>
                    <span className="ml-auto text-sm">20</span>
                </div>
                <div className="flex gap-x-2 items-center">
                    <input type='checkbox' onChange={(evt) => { handleCheckboxChange(evt) }} className="border-border" id="dormiroty" />
                    <Label htmlFor='dormiroty'>Ký túc xá</Label>
                    <span className="ml-auto text-sm">14</span>
                </div>
                <div className="flex gap-x-2 items-center">
                    <input type='checkbox' onChange={(evt) => { handleCheckboxChange(evt) }} className="border-border" id="studio-apartment" />
                    <Label htmlFor='studio-apartment'>Căn hộ mini</Label>
                    <span className="ml-auto text-sm">14</span>
                </div>
                <div className="flex gap-x-2 items-center">
                    <input type='checkbox' onChange={(evt) => { handleCheckboxChange(evt) }} className="border-border" id="entire-house" />
                    <Label htmlFor='entire-house'>Nhà nguyên căn</Label>
                    <span className="ml-auto text-sm">1</span>
                </div>
            </div>
        </div>
    );
};

export default AssetTypeSelector;