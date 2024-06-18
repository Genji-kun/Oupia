import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { submitLandlordFormSchema } from '@/lib/schemas/LandlordSchema'
import { AssetType } from '@/lib/types/enums'
import { ISubmitLandlordForm } from '@/lib/types/interfaces/Asset'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import LocationInput from './location-input'
import { Button } from '@/components/ui/button'
import AmenityInput from './amenity-input'
import PhotoInputs from './photo-inputs'

const AssetSubmitForm = () => {

    const submitLandlordForm = useForm<ISubmitLandlordForm>({
        resolver: zodResolver(submitLandlordFormSchema),
        defaultValues: {
            assetInfo: {
                amenities: []
            }
        }
    })

    async function onSubmit(values: ISubmitLandlordForm) {

    }

    return (
        <Form {...submitLandlordForm}>
            <form onSubmit={submitLandlordForm.handleSubmit(onSubmit)} className="space-y-4 p-6 bg-background dark:border rounded-lg shadow-md">
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={submitLandlordForm.control}
                        name="assetInfo.assetName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base">Tên nhà trọ</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nhập tên nhà trọ..." {...field} className='bg-accent dark:bg-oupia-base' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={submitLandlordForm.control}
                        name="assetInfo.assetType"
                        render={({ field }) => (
                            <FormItem className="">
                                <FormLabel className="text-base">Loại căn hộ</FormLabel>
                                <FormControl>
                                    <Select defaultValue={field.value} onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger className='bg-accent dark:bg-oupia-base'>
                                                <SelectValue placeholder="Loại hình căn hộ của bạn thuộc loại nào?" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value={AssetType.BOARDING_HOUSE}>Dãy trọ</SelectItem>
                                            <SelectItem value={AssetType.SHARED_HOUSING_SYSTEM}>Hệ thống nhà chung</SelectItem>
                                            <SelectItem value={AssetType.APARTMENT}>Chung cư</SelectItem>
                                            <SelectItem value={AssetType.DORMIROTY}>Ký túc xá</SelectItem>
                                            <SelectItem value={AssetType.STUDIO_APARTMENT}>Căn hộ mini</SelectItem>
                                            <SelectItem value={AssetType.ENTIRE_HOUSE}>Nhà nguyên căn</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={submitLandlordForm.control}
                    name="assetInfo.assetDescription"
                    render={({ field }) => (
                        <FormItem className="">
                            <FormLabel className="text-base">Mô tả chi tiết, giới thiệu về căn hộ</FormLabel>
                            <FormControl>
                                <Textarea placeholder='Nhập nội dung mô tả...' {...field} className='bg-accent dark:bg-oupia-base' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-3 gap-4">
                    <FormField
                        control={submitLandlordForm.control}
                        name="assetInfo.price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base">Giá thuê</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Nhập giá thuê..." {...field} className='bg-accent dark:bg-oupia-base' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={submitLandlordForm.control}
                        name="assetInfo.area"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base">Diện tích</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Nhập diện tích..." {...field} className='bg-accent dark:bg-oupia-base' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={submitLandlordForm.control}
                        name="assetInfo.maxPeople"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base">Số người tối đa</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Nhập số lượng..." {...field} className='bg-accent dark:bg-oupia-base' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <LocationInput form={submitLandlordForm} />
                <AmenityInput form={submitLandlordForm} />
                <PhotoInputs form={submitLandlordForm} />

                <FormField
                    control={submitLandlordForm.control}
                    name="note"
                    render={({ field }) => (
                        <FormItem className="">
                            <FormLabel className="text-base">Các nội dung bằng chứng khác</FormLabel>
                            <FormControl>
                                <Textarea placeholder='Nhập nội dung mô tả...' {...field} className='bg-accent dark:bg-oupia-base' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-center">
                    <Button type="submit" className="styled-button">Xác nhận thông tin</Button>
                </div>
            </form>
        </Form>
    )
}

export default AssetSubmitForm;