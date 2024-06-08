"use client"

import { useAssetDetailContext } from '@/contexts/asset-detail-context';
import React from 'react'
import ReviewItem from './review-item';
import { Loader2 } from 'lucide-react';

function AssetReviews() {

    const { reviews, isFetchingReviews } = useAssetDetailContext();

    return (
        <>
            {
                !isFetchingReviews ? <>

                    {
                        reviews && reviews.length > 0 &&
                        <div className="flex flex-col gap-4 p-6 rounded-lg border shadow-light-theme shadow-dark-theme">
                            <h1 className="text-2xl font-semibold font-montserrat">Đánh giá của người dùng</h1>
                            <div className=" flex flex-col gap-4">
                                <>
                                    {
                                        reviews.map(review => {
                                            return <React.Fragment key={review.id}>
                                                <ReviewItem review={review} />
                                            </React.Fragment>
                                        })
                                    }
                                </>
                            </div>
                        </div>

                    }
                </> : <div className='flex items-center justify-center'>
                    <Loader2 className='text-primary animate-spin' />
                </div>
            }

        </>
    )
}

export default AssetReviews;
