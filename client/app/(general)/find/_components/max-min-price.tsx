"use client"

import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { changeFilter } from '@/redux/filter/motelFilterSlice';
import { RootState } from '@/redux/store';
import formatCurrency from '@/utils/priceConvert';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const MaxMinPrice = () => {
    const dispatch = useDispatch();
    const price = useSelector((state: RootState) => state.motelFilter.price);
    const [values, setValues] = useState(price);
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

    useEffect(() => {
        dispatch(changeFilter({ price: values }));
        console.log(price)
    }, [values, price, dispatch])

    return (
        <div className="flex flex-col gap-y-4">
            <h2 className="font-semibold text-lg">Giá thuê</h2>
            <div className="flex flex-col gap-y-4">
                <Slider
                    value={values}
                    onValueChange={setValues}
                    max={50000000}
                    step={500000}
                />
                <div className="flex gap-x-2">
                    {values.map((value, index) => (
                        <Input
                            key={index}
                            type="number"
                            value={value}
                            onChange={(event) => handleInputChange(index, event)}
                        />
                    ))}
                </div>
                <h2 className="flex justify-between">Giá từ: <span>{formatCurrency(values[0])}đ - {formatCurrency(values[1])}đ</span></h2>
            </div>
        </div>
    );
};

export default MaxMinPrice;