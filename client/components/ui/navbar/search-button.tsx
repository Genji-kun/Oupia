import React from 'react';
import { Button } from '../button';
import { Search } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '../dialog';

const SearchButton = () => {
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="ghost" className="p-2.5 rounded-full ">
                        <Search size={20}></Search>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[40%] p-0 top-1/4 h-fit">
                    <DialogHeader className="border-b border-border">
                        <div className="w-full grid grid-cols-12">
                            <div className="absolute top-4 left-4 flex items-center justify-center">
                                <Search className="h-4 w-4" />
                            </div>
                            <div />
                            <input
                                className="enabled:focus:ring-0 enabled:focus:outline-none border-0 col-span-10 px-0 py-3 bg-background"
                                placeholder='Tìm kiếm địa điểm, dự án cụ thể bạn muốn thuê...'
                            />
                        </div>
                    </DialogHeader>
                    <div className="p-5 pt-0 flex flex-col justify-center">
                        <span className="text-center">Không tìm thấy kiếm quả.</span>
                    </div>
                </DialogContent>
            </Dialog>
        </div >
    );
};

export default SearchButton;