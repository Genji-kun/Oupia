import React, { PropsWithChildren } from 'react';
import { Gender } from '@/lib/enums';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const getGenderLabel = (gender: Gender): string => {
    switch (gender) {
        case Gender.MALE:
            return 'Nam';
        case Gender.FEMALE:
            return 'Nữ';
        case Gender.OTHER:
            return 'Khác';
        default:
            return '';
    }
};

const genderOptions = Object.values(Gender).map((value) => ({
    value,
    label: getGenderLabel(value),
}));

type IGenderSelectProps = PropsWithChildren<{
    control: any;
    name: string;
    isSubmitting: boolean;
}>;

const GenderSelect: React.FC<IGenderSelectProps> = ({ control, name, isSubmitting }) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-base font-semibold text-foreground">Giới tính</FormLabel>
                    <Select disabled={isSubmitting} onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger className="dark:bg-oupia-sub">
                                <SelectValue />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {genderOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default GenderSelect;
