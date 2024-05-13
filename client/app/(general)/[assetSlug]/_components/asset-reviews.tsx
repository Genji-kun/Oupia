"use client"

import { useAssetDetailContext } from '@/contexts/asset-detail-context';
import React from 'react'
import ReviewItem from './review-item';

function AssetReviews() {

    const { asset, isFetchingReviews, reviews} = useAssetDetailContext();



    if (isFetchingReviews || !asset) {
        return <></>
    }

    return (
        <>
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
        </>
    )

    return (
        <div>

        </div>
    )
}

export default AssetReviews;
