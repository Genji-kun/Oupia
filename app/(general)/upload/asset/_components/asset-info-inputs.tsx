"use client"

import React from 'react'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

import { cn } from '@/lib/utils';
import { useUploadContext } from '@/contexts/upload-context';


function AssetInfoInputs() {

    const { asset, setAsset } = useUploadContext();

    const handleAssetTypeChange = (value: string) => {
        setAsset((current: any) => { return { ...current, assetType: value } })
    }

    const handleFormChange = (field: string, value: any) => {
        setAsset((current: any) => {
            return {
                ...current,
                [field]: value,
            }
        })
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-3">
                <div className="space-y-2">
                    <Label>Tên căn hộ</Label>
                    <Input
                        placeholder='Nhập tên căn hộ...'
                        className="dark:bg-oupia-sub"
                        value={asset.assetName}
                        name="assetName"
                        onChange={(evt) => handleFormChange(evt.target.name, evt.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Loại hình căn hộ</Label>
                    <Select defaultValue={asset.assetType && asset.assetType} onValueChange={value => handleAssetTypeChange(value)}>
                        <SelectTrigger className={cn("dark:bg-oupia-sub", !asset.assetType && "text-muted-foreground")}>
                            <SelectValue placeholder="Loại hình căn hộ của bạn thuộc loại nào?" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="BOARDING_HOUSE">Dãy trọ</SelectItem>
                            <SelectItem value="SHARED_HOUSING_SYSTEM">Hệ thống nhà chung</SelectItem>
                            <SelectItem value="APARTMENT">Chung cư</SelectItem>
                            <SelectItem value="DORMIROTY">Ký túc xá</SelectItem>
                            <SelectItem value="STUDIO_APARTMENT">Căn hộ mini</SelectItem>
                            <SelectItem value="ENTIRE_HOUSE">Nhà nguyên căn</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="space-y-2">
                <Label>Mô tả chi tiết, giới thiệu về căn hộ</Label>
                <Textarea
                    rows={5}
                    placeholder='Nhập nội dung mô tả...'
                    className="dark:bg-oupia-sub"
                    value={asset.assetDescription}
                    name="assetDescription"
                    onChange={(evt) => handleFormChange(evt.target.name, evt.target.value)}
                />
            </div>
            <div className="w-full grid grid-cols-1 xl:grid-cols-3 gap-3">
                <div className="space-y-2">
                    <Label>Giá thuê</Label>
                    <div className="relative">
                        <Input
                            placeholder='Nhập giá tiền...'
                            className="dark:bg-oupia-sub pr-20"
                            value={asset.price}
                            name="price"
                            onChange={(evt) => handleFormChange(evt.target.name, evt.target.value)}
                        />
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 px-2 border-l border-foreground">tháng</span>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label>Diện tích</Label>
                    <div className="relative">
                        <Input
                            placeholder='Nhập diện tích...'
                            className="dark:bg-oupia-sub pr-20"
                            value={asset.area}
                            name="area"
                            onChange={(evt) => {
                                    handleFormChange(evt.target.name, evt.target.value)
                            }}
                        />
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 px-2 border-l border-foreground">m²</span>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label>Số người tối đa</Label>
                    <div className="relative">
                        <Input
                            placeholder='Nhập số người ở...'
                            className="dark:bg-oupia-sub pr-20"
                            value={asset.maxPeople}
                            name="maxPeople"
                            onChange={(evt) => handleFormChange(evt.target.name, evt.target.value)}
                        />
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 px-2 border-l border-foreground">người</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AssetInfoInputs
