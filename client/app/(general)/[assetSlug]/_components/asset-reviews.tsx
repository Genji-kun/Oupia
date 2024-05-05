"use client"

import { reviewEndpoints } from '@/configs/axiosEndpoints';
import { authApi } from '@/configs/axiosInstance';
import { useAssetDetailContext } from '@/contexts/asset-detail-context';
import { ReviewResponse } from '@/interfaces/Review';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import ReviewItem from './review-item';

function AssetReviews() {

    const { asset } = useAssetDetailContext();

    const getReviews = async (assetId: number): Promise<ReviewResponse[] | undefined> => {
        try {
            const res = await authApi.get(reviewEndpoints["getReviews"], {
                params: {
                    assetId: assetId,
                }
            })
            return res.data.content;
        } catch (error) {
            console.error(error);
        }
    }

    const { data: reviews, isFetching } = useQuery<ReviewResponse[] | undefined>({
        queryKey: ["getReviews", asset && asset.id],
        queryFn: () => getReviews(asset && asset.id),
        refetchOnWindowFocus: false,
    })

    if (isFetching || !asset) {
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
