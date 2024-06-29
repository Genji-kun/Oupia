"use client"

import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { ImHome } from "react-icons/im";
import Link from 'next/link';
import React from 'react'

const LandlordInfoSection = () => {


    return (
        <div className='flex justify-between items-center'>
            <div className='flex gap-4 items-center'>
                <ImHome className="text-primary w-10 h-10" />
                <div className='h-fit'>
                    <h3 className='text-muted-foreground'>Tham gia xác thực cộng đồng yêu cầu đánh giá của <span className='text-foreground font-semibold'>Chủ nhà trọ</span></h3>
                    <h5 className='text-sm'>+5 điểm <span className='text-muted-foreground'>(nếu bạn thuộc cộng đồng đánh giá chính xác).</span></h5>
                </div>
            </div>
            <Link href="/vote/">
                <Button className='styled-button pr-2'>
                    <span>Bắt đầu</span>
                    <ChevronRight className='w-5 h-5 ml-2' />
                </Button>
            </Link>
        </div>
    )
}

export default LandlordInfoSection;