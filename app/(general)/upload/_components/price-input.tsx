"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { useUploadContext } from '@/contexts/upload-context';
import { formatCurrency } from '@/utils/priceConvert';
import { isUndefined } from 'lodash-es';
import React, { useState } from 'react';

function PriceInput() {

    const { tagPrice, setTagPrice } = useUploadContext();

    const [values, setValues] = useState([0, 1000000]);
    const handleInputChange = (index: number, event: any) => {
        let value = parseInt(event.target.value, 10);
        if (isNaN(value)) {
            value = 0;
        } else if (value < 0) {
            value = 0;
        } else if (value > 50000000) {
            value = 50000000;
        }
        const newValues = [...values];
        newValues[index] = value;
        setValues(newValues);
    };

    const handleAddTag = () => {
        setTagPrice({
            minPrice: values[0],
            maxPrice: values[1]
        })
    }

    return (
        <div className="flex flex-col gap-y-4 w-full pt-4">
            <div className="flex flex-col gap-y-4">
                <Slider
                    value={values}
                    onValueChange={setValues}
                    max={50000000}
                    step={100000}
                    disabled={!isUndefined(tagPrice)}
                />
                <div className="flex gap-x-2">
                    {values.map((value, index) => (
                        <Input
                            key={index}
                            type="number"
                            value={value}
                            onChange={(event) => handleInputChange(index, event)}
                            disabled={!isUndefined(tagPrice)}
                        />
                    ))}
                </div>
                <div className="flex justify-between items-center">
                    <h2 className="space-x-2">Giá từ: <span>{formatCurrency(values[0])}đ - {formatCurrency(values[1])}đ</span></h2>
                    <Button disabled={!isUndefined(tagPrice)} onClick={handleAddTag} className="styled-button h-fit w-fit py-2.5">
                        <span className="text-sm">Thêm giá tiền</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default PriceInput