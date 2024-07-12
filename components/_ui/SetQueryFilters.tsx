"use client";
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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function SetQueryFilters() {
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
    const [date, setDate] = React.useState<Date>()
    const handleOnSelect = (value: string) => {
        setDate(value)
        router.push(pathname + "?" + createQueryString("filter", date));
    }

    const [practices, setPractices] = useState('ce');
    const handleStringToInt = (value: string) => {
        setPractices(value)
        router.push(pathname + "?" + createQueryString("filter", practices));
    }
    return (
        <>
            <input
                type="text"
                value={searchParams.get("filter") || ""}
                onChange={(e) => {
                    router.push(pathname + "?" + createQueryString("filter", e.target.value));
                }}
            />
            <Select onValueChange={handleStringToInt}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Fruits</SelectLabel>
                        <SelectItem value="ce">{practices}</SelectItem>
                        <SelectItem value="a">a</SelectItem>
                        <SelectItem value="m">m</SelectItem>
                        <SelectItem value="k">k</SelectItem>
                        <SelectItem value="l">l</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleOnSelect}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </>
    );
}