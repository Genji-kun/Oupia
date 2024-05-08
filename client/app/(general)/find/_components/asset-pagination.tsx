"use client"

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFindAssetContext } from '@/contexts/find-asset-context';
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react';

import React from 'react'

function AssetPagination() {

    const { pageSize, setPageSize, assets, isFetching, setCurrentPage, currentPage, totalPages } = useFindAssetContext();

    return (
        <>
            {
                (!isFetching) && (assets && assets.length > 0 && <div className="w-full gap-x-4 gap-y-2 flex flex-wrap items-center justify-center">
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            className="h-8 w-fit px-4 py-5 flex gap-2"
                            onClick={() => setCurrentPage(prev => prev - 1)}
                            disabled={currentPage <= 1}>
                            <ChevronLeftIcon className="h-4 w-4" />
                            <span>Trang trước</span>
                        </Button>

                        <Button
                            variant="outline"
                            className="h-8 w-fit px-4 py-5 flex gap-2"
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            disabled={currentPage >= totalPages}>
                            <span>Trang sau</span>
                            <ChevronRightIcon className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="flex items-center gap-x-2 flex-shrink-0 text-sm">
                        <span>Hiện</span>
                        <Select defaultValue={pageSize.toString()} onValueChange={value => setPageSize(Number(value))}>
                            <SelectTrigger className="w-fit py-5">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent side="top" align='center'>
                                <SelectGroup>
                                    <SelectItem value="4">4</SelectItem>
                                    <SelectItem value="8">8</SelectItem>
                                    <SelectItem value="12">12</SelectItem>
                                    <SelectItem value="16">16</SelectItem>
                                    <SelectItem value="20">20</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                            <span>thành phần trong một trang</span>
                        </Select>
                    </div>
                </div >)
            }
        </>
    )
}

export default AssetPagination
