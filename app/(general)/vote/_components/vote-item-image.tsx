import { ILandlordInfo } from '@/lib/types/interfaces/User'
import React from 'react'
import Image from 'next/image'

const VoteItemImage = ({ voteItem }: { voteItem: ILandlordInfo }) => {

    return (
        <>
            {voteItem?.images.length > 0 && (
                <>
                    {(() => {
                        switch (voteItem.images.length) {
                            case 3:
                                return <div className="w-full grid grid-rows-2 grid-cols-5 gap-1 aspect-video">
                                    <Image src={voteItem.images[0].url}
                                        alt="Asset Image"
                                        width={1000}
                                        height={1000}
                                        className="object-cover w-full h-full row-span-2 col-span-3" />
                                    <Image src={voteItem.images[1].url}
                                        alt="Asset Image"
                                        width={1000}
                                        height={1000}
                                        className="object-cover w-full h-full aspect-square col-span-2" />
                                    <Image src={voteItem.images[2].url}
                                        alt="Asset Image"
                                        width={1000}
                                        height={1000}
                                        className="object-cover w-full h-full aspect-square col-span-2" />
                                </div>
                            case 4:
                                return <div className="w-full grid grid-rows-2 grid-cols-2 gap-1 aspect-video">
                                    <Image src={voteItem.images[0].url}
                                        alt="Asset Image"
                                        width={1000}
                                        height={1000}
                                        className="object-cover w-full h-full aspect-square" />
                                    <Image src={voteItem.images[1].url}
                                        alt="Asset Image"
                                        width={1000}
                                        height={1000}
                                        className="object-cover w-full h-full aspect-square" />
                                    <Image src={voteItem.images[2].url}
                                        alt="Asset Image"
                                        width={1000}
                                        height={1000}
                                        className="object-cover w-full h-full aspect-square" />
                                    <Image src={voteItem.images[3].url}
                                        alt="Asset Image"
                                        width={1000}
                                        height={1000}
                                        className="object-cover w-full h-full aspect-square" />
                                </div>
                            default:
                                return <div className="w-full aspect-video grid grid-rows-2 grid-cols-2 gap-1">
                                    <Image src={voteItem.images[0].url}
                                        alt="Asset Image"
                                        width={1000}
                                        height={1000}
                                        className="object-cover w-full h-full aspect-square" />
                                    <Image src={voteItem.images[1].url}
                                        alt="Asset Image"
                                        width={1000}
                                        height={1000}
                                        className="object-cover w-full h-full aspect-square" />
                                    <Image src={voteItem.images[2].url}
                                        alt="Asset Image"
                                        width={1000}
                                        height={1000}
                                        className="object-cover w-full h-full aspect-square" />
                                    <div className="relative w-full h-full aspect-square">
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                                            <h2 className="font-semibold text-4xl">+<span>{voteItem.images.length - 3}</span></h2>
                                        </div>
                                        <Image src={voteItem.images[3].url}
                                            alt="Post Image"
                                            width={1000}
                                            height={1000}
                                            className="object-cover w-full h-full" />
                                    </div>
                                </div>
                        }
                    })()}
                </>
            )}
        </>
    )
}

export default VoteItemImage;