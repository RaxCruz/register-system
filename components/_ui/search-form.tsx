"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Bird, Rabbit, Turtle } from "lucide-react";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import DatePickerFrom from "./date-from"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";


export default function SearchForm(props: { venueMenus: any }) {
    const { venueMenus } = props
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [selectedItem, setSelectedItem] = useState('全部')
    const [selectedDate, setSelectedDate] = useState('') //預設今天

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams?.toString());
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );
    const [selectedPlace, setSelectedPlace] = useState('');
    //router.push(pathname + "?" + createQueryString("place", selectedPlace));

    const handleSelectChange = (value: any) => {

        setSelectedPlace(value)
        router.push(pathname + "?" + createQueryString("place", value));

    }
    // router.push(pathname + "?" + createQueryString("date", formatDate(date)));
    //setSelectedPlace(value)  
    return (
        <div className="grid w-full items-start gap-6">
            <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium whitespace-nowrap">
                    進階搜尋
                </legend>
                <form className="space-y-2">
                    <Select onValueChange={handleSelectChange}>
                        <SelectTrigger
                            id="model"
                            className="items-start [&_[data-description]]:hidden"
                        >
                            <SelectValue placeholder={selectedItem} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">
                                <div className="flex items-start gap-3 text-muted-foreground">

                                    <div className="grid gap-0.5">
                                        <p>

                                            <span className="font-medium text-foreground">
                                                全部
                                            </span>
                                        </p>
                                        <p className="text-xs" data-description>
                                            查詢所有結果
                                        </p>
                                    </div>
                                </div>
                            </SelectItem>
                            {venueMenus.map((venueMenus: any, index: any) => {
                                if (venueMenus.placename)
                                    return (
                                        <SelectItem value={venueMenus.placename} key={index}>
                                            <div className="flex items-start gap-3 text-muted-foreground">

                                                <div className="grid gap-0.5">
                                                    <p>

                                                        <span className="font-medium text-foreground">
                                                            {venueMenus.placename}
                                                        </span>
                                                    </p>
                                                    <p className="text-xs" data-description>
                                                        場地編號: {venueMenus.placeno}
                                                    </p>
                                                </div>
                                            </div>
                                        </SelectItem>
                                    )
                            })}
                            {/* <SelectItem value="C101">
                                <div className="flex items-start gap-3 text-muted-foreground">

                                    <div className="grid gap-0.5">
                                        <p>

                                            <span className="font-medium text-foreground">
                                                C101教室
                                            </span>
                                        </p>
                                        <p className="text-xs" data-description>
                                            Our fastest model for general use cases.
                                        </p>
                                    </div>
                                </div>
                            </SelectItem>
                            <SelectItem value="explorer">
                                <div className="flex items-start gap-3 text-muted-foreground">

                                    <div className="grid gap-0.5">
                                        <p>

                                            <span className="font-medium text-foreground">
                                                體育館
                                            </span>
                                        </p>
                                        <p className="text-xs" data-description>
                                            Performance and speed for efficiency.
                                        </p>
                                    </div>
                                </div>
                            </SelectItem>
                            <SelectItem value="quantum">
                                <div className="flex items-start gap-3 text-muted-foreground">

                                    <div className="grid gap-0.5">
                                        <p>

                                            <span className="font-medium text-foreground">
                                                游泳池
                                            </span>
                                        </p>
                                        <p className="text-xs" data-description>
                                            The most powerful model for complex computations.
                                        </p>
                                    </div>
                                </div>
                            </SelectItem> */}
                        </SelectContent>
                    </Select>
                    <DatePickerFrom />
                    <Button type="submit" className="hidden">Submit</Button>
                </form>
            </fieldset>

        </div >
    )
}