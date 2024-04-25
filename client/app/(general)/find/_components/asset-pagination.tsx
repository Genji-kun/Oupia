"use client"

import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import React from 'react'

function AssetPagination() {
    return (
        <div className="w-full gap-x-4 gap-y-2 flex flex-wrap items-center justify-center">
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
            <div className="flex items-center gap-x-2 flex-shrink-0 text-sm">
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
    )
}

export default AssetPagination
