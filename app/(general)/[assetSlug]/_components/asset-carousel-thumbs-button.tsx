import Image from 'next/image'
import React from 'react'

type PropType = {
    selected: boolean
    imgSrc: string
    onClick: () => void
}

export const Thumb: React.FC<PropType> = (props) => {
    const { selected, imgSrc, onClick } = props

    return (
        <div
            className={'embla-thumbs__slide'.concat(
                selected ? ' embla-thumbs__slide--selected' : ''
            )}
        >
            <button
                onClick={onClick}
                className="embla-thumbs__slide__button rounded-lg"
                type="button"
            >
                <Image
                    width="500"
                    height="500"
                    className="object-cover rounded-lg aspect-square w-24"
                    src={imgSrc}
                    alt="Your alt text"
                />
            </button>
        </div>
    )
}
