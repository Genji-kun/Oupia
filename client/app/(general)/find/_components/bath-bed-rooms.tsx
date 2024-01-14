import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import React from 'react';

const BathBedRooms = () => {
    return (
        <div className="flex flex-col gap-y-4">
            <h2 className="font-semibold text-lg">Phòng ngủ & Phòng tắm</h2>
            <RadioGroup className="flex gap-x-2 overflow-x-auto scrollbar-thin pb-2">
                <div className="[&:has([data-state=checked])>div]:border-primary flex-shrink-0">
                    <RadioGroupItem value="1-2" className="sr-only" />
                    <div className="items-center rounded-md border-2 border-muted px-4 py-2 hover:border-accent">
                        1 - 2 phòng
                    </div>
                </div>
                <div className="[&:has([data-state=checked])>div]:border-primary flex-shrink-0">
                    <RadioGroupItem value="2-3" className="sr-only" />
                    <div className="items-center rounded-md border-2 border-muted px-4 py-2 hover:border-accent">
                        2 - 3 phòng
                    </div>
                </div>
                <div className="[&:has([data-state=checked])>div]:border-primary flex-shrink-0">
                    <RadioGroupItem value="3-4" className="sr-only" />
                    <div className="items-center rounded-md border-2 border-muted px-4 py-2 hover:border-accent">
                        3 - 4 phòng
                    </div>
                </div>
                <div className="[&:has([data-state=checked])>div]:border-primary flex-shrink-0">
                    <RadioGroupItem value="4-5" className="sr-only" />
                    <div className="items-center rounded-md border-2 border-muted px-4 py-2 hover:border-accent">
                        4 - 5 phòng
                    </div>
                </div>
                <div className="[&:has([data-state=checked])>div]:border-primary flex-shrink-0">
                    <RadioGroupItem value=">5" className="sr-only" />
                    <div className="items-center rounded-md border-2 border-muted px-4 py-2 hover:border-accent">
                        &gt; 5 phòng
                    </div>
                </div>
            </RadioGroup>
        </div>
    );
};

export default BathBedRooms;