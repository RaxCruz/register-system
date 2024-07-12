"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

import DatePickerFrom from "./date-from"
import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";


export default function TableFilter() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );
    const [selectedPlace, setSelectedPlace] = useState('');
    const handleOnSelectPlace = (value: string) => {
        setSelectedPlace(value)
        router.push(pathname + "?" + createQueryString("filter", selectedPlace));
    }
    return (
        <div className="grid w-full items-start gap-6">
            <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                    進階搜尋
                </legend>
                <Select onValueChange={handleOnSelectPlace}>
                    <SelectTrigger
                        id="model"
                        className="items-start [&_[data-description]]:hidden"
                    >
                        <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="genesis">
                            <div className="flex items-start gap-3 text-muted-foreground">

                                <div className="grid gap-0.5">
                                    <p>

                                        <span className="font-medium text-foreground">
                                            棒球場
                                        </span>
                                    </p>
                                    <p className="text-xs" data-description>
                                        Our fastest model for general use cases.
                                    </p>
                                </div>
                            </div>
                        </SelectItem>
                        <SelectItem value="C101">
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
                        </SelectItem>
                    </SelectContent>
                </Select>
                <DatePickerFrom />
            </fieldset>

        </div >
    )
}