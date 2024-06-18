import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ISubmitLandlordForm } from '@/lib/types/interfaces/Asset';
import { cn } from '@/lib/utils';
import { FilePlus2, X } from 'lucide-react';
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

const PhotoInputs = ({ form }: { form: UseFormReturn<ISubmitLandlordForm, any, undefined> }) => {

    const [isDragging, setIsDragging] = useState<boolean>(false);

    const handleChangePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const newFiles = Array.from(event.target.files);
            const updatedFiles = [...(form.getValues('assetInfo.images') || []), ...newFiles];
            form.setValue('assetInfo.images', updatedFiles);
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            const newFiles = Array.from(event.dataTransfer.files);
            const updatedFiles = [...(form.getValues('assetInfo.images') || []), ...newFiles];
            form.setValue('assetInfo.images', updatedFiles);
            setIsDragging(false);
        }
    };

    const handleRemoveFile = (index: number) => {
        const updatedFiles = (form.getValues('assetInfo.images') || []).filter((_, i) => i !== index);
        form.setValue('assetInfo.images', updatedFiles);
    };


    return (
        <FormField
            control={form.control}
            name='assetInfo.images'
            render={() => (
                <FormItem className='space-y-2'>
                    <div className='space-y-2'>
                        {form.getValues('assetInfo.images')?.length > 0 && <h4 className="font-bold text-lg uppercase">Ảnh nhà trọ</h4>}
                        {form.getValues('assetInfo.images')?.map((file, index) => (
                            <div key={index} className='flex items-center gap-2'>
                                <span className='flex-auto truncate text-muted-foreground'>{file.name}</span>
                                <Button
                                    type='button'
                                    variant={'destructive'}
                                    className='px-2 py-1 w-fit h-fit'
                                    onClick={() => handleRemoveFile(index)}
                                >
                                    <X className='h-3 w-3' />
                                </Button>
                            </div>
                        ))}
                    </div>
                    <div
                        onDragOver={(event) => {
                            event.preventDefault();
                            setIsDragging(true);
                        }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                        className={cn(
                            'relative rounded border-2 border-dashed border-muted-foreground/50 p-3 text-sm font-medium text-muted-foreground/50 hover:border-primary hover:bg-accent hover:text-primary hover:shadow-lg',
                            isDragging && 'cursor-copy border-primary bg-accent text-primary shadow-lg',
                            'cursor-pointer'
                        )}
                    >
                        <label
                            htmlFor='images-input'
                            className='flex items-center justify-center gap-2 w-full'
                        >
                            <FilePlus2 className='h-5 w-5' />
                            <span className='flex items-center gap-1'>
                                Thêm hoặc kéo thả tệp tin
                            </span>
                            <FormControl>
                                <Input
                                    id='images-input'
                                    type='file'
                                    multiple
                                    accept=".png,.jpg,.jpeg"
                                    className='hidden'
                                    onChange={handleChangePhoto}
                                />
                            </FormControl>
                        </label>
                    </div>

                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default PhotoInputs;
