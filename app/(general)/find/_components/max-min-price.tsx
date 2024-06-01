"use client"

import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { useFindAssetContext } from '@/contexts/find-asset-context';
import { formatCurrency } from '@/utils/priceConvert';
import React from 'react';

const MaxMinPrice = () => {

    const { priceRate, setPriceRate } = useFindAssetContext();

    const handleInputChange = (index: number, event: any) => {
        let value = parseInt(event.target.value, 10);
        if (isNaN(value)) {
            value = 0;
        } else if (value < 0) {
            value = 0;
        } else if (value > 50000000) {
            value = 50000000;
        }
        const newValues = [...priceRate];
        newValues[index] = value;
        setPriceRate(newValues);
    };

    return (
        <div className="flex flex-col gap-y-4">
            <h2 className="font-semibold text-lg">Giá thuê</h2>
            <div className="flex flex-col gap-y-4">
                <Slider
                    value={priceRate}
                    onValueChange={setPriceRate}
                    max={50000000}
                    step={500000}
                />
                <div className="flex gap-x-2">
                    {priceRate.map((value, index) => (
                        <Input
                            key={index}
                            type="number"
                            value={value}
                            onChange={(event) => handleInputChange(index, event)}
                        />
                    ))}
                </div>
                <h2 className="flex justify-between">Giá từ: <span>{formatCurrency(priceRate[0])}đ - {formatCurrency(priceRate[1])}đ</span></h2>
            </div>
        </div>
    );
};

export default MaxMinPrice;