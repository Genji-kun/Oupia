import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useUploadContext } from '@/contexts/upload-context';
import { UploadCloudIcon, X } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import LocationInput from './location-input';
import MapContainer from './map-containter';
import AssetInfoInputs from './asset-info-inputs';
import AmenityInput from './amenity-input';

function UploadAssetForm() {
    const { asset, images, setImages } = useUploadContext();

    const handleFileChange = (evt: any) => {
        const newFiles = Array.prototype.slice.call(evt.target.files);
        setImages((current: any) => [...(current || []), ...newFiles]);
    }


    const handleDelete = (file: File) => {
        setImages((images: File[]) => images.filter((f) => f !== file));
    }

    return (
        <div className="flex flex-col gap-4 py-2 pb-4">
            <div>
                <h4 className="text-xl font-semibold">Thông tin căn hộ</h4>
                <span className="text-sm text-muted-foreground">Thông tin căn hộ sẽ được hiển thị trên trang tìm thuê căn hộ.</span>
            </div>
            <Separator />
            <Accordion type="multiple" defaultValue={["infomation", "amenities","location", "images"]} className="w-full">
                <AccordionItem value="infomation">
                    <AccordionTrigger>
                        <span className="font-semibold text-lg">Mô tả về căn hộ</span>
                    </AccordionTrigger>
                    <AccordionContent>
                        <AssetInfoInputs />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="amenities">
                    <AccordionTrigger>
                        <span className="font-semibold text-lg">Tiện ích của căn hộ</span>
                    </AccordionTrigger>
                    <AccordionContent>
                        <AmenityInput />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="location">
                    <AccordionTrigger>
                        <span className="font-semibold text-lg">Địa chỉ căn hộ</span>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-3">
                            <LocationInput />
                            <MapContainer longitude={asset.locationLong} latitude={asset.locationLat} />
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="images">
                    <AccordionTrigger>
                        <span className="font-semibold text-lg">Hình ảnh</span>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="flex w-full justify-center rounded-lg border border-dashed dark:border-muted-foreground border-muted-foreground px-6 py-10 dark:bg-oupia-base">
                            <div className="text-center relative">
                                <UploadCloudIcon className="mx-auto h-12 w-12" aria-hidden="true" />
                                <div className="mt-4 flex text-muted-foreground text-base">
                                    <label
                                        htmlFor="assetImages"
                                        className="relative cursor-pointer rounded-md text-primary hover:text-primary-700 hover:underline"
                                    >
                                        <span>Tải lên file</span>
                                        <Input
                                            id="assetImages"
                                            name="assetImages"
                                            type="file"
                                            multiple
                                            className="sr-only"
                                            accept="image/png, image/jpeg"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                    <p className="pl-1">hoặc kéo thả từ thư mục</p>
                                </div>
                                <p className="text-sm">Chỉ nhận ảnh PNG, JPG</p>
                            </div>
                        </div>
                        {images.length !== 0 && (
                            <div className="flex flex-wrap gap-5 items-center pt-4">
                                {images.map((image, index) => (
                                    <div key={index} className="col-span-1 relative ">
                                        <X className="text-destructive font-bold w-6 h-6 p-1 bg-background hover:bg-border dark:hover:bg-oupia-sub dark:bg-oupia-base rounded-full absolute -right-2 -top-2 cursor-pointer" onClick={() => handleDelete(image)} />
                                        <Image width={500} height={500} className="rounded-lg object-cover w-32 aspect-square" src={URL.createObjectURL(image)} alt={image.name} />
                                    </div>
                                ))}
                            </div>)}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default UploadAssetForm;
