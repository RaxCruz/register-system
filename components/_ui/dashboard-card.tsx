
import { Badge } from '../ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ComponentProps, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import { Separator } from '../ui/separator';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
export default function DashboardCard(props: { venueDetails: any }) {
    const [session, setSession] = useState(8)
    const { venueDetails } = props
    console.log(venueDetails.length)
    function getBadgeVariantFromLabel(
        label: string
    ): ComponentProps<typeof Badge>["variant"] {
        if (["default"].includes(label.toLowerCase())) {
            return "default"
        }

        if (["personal"].includes(label.toLowerCase())) {
            return "outline"
        }

        if (["rent"].includes(label.toLowerCase())) {
            return "secondary"
        }

        return "secondary"
    }
    return (
        <Card x-chunk="dashboard-07-chunk-0" className="shadow-none rounded-none border-none">
            <CardHeader>
                {/* <CardTitle>Product Details</CardTitle> */}
                <CardDescription>
                    上次更新時間:<span> 2024-06-24 16:15:15</span>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all">
                    <div className="flex w-full flex-col gap-1">
                        <div className="flex items-center">
                            <div className="flex items-center gap-2">
                                <div className="font-semibold">時段</div>
                                <span className="flex h-2 w-2 rounded-full bg-blue-600" />

                            </div>
                            {/* <div className="ml-auto text-xs">
                                456
                            </div> */}
                        </div>
                        {/* <div className="text-xs font-medium">789</div> */}
                    </div>
                    <div className="line-clamp-2 text-xs text-muted-foreground">
                        🔺紅色為尚未稽核時段
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        {Array.from([8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], (e, i) => {
                            console.log(session, e)
                            return (
                                <Popover>
                                    <PopoverTrigger >
                                        {venueDetails.map((venueDetail: any) => {
                                            let isRent = false
                                            if (e >= venueDetail.use_section && e <= venueDetail.use_section_end) { isRent = true }
                                            if (isRent) {
                                                return (
                                                    <Badge data-session={e} variant={session == e ? getBadgeVariantFromLabel('default') : getBadgeVariantFromLabel('rent')} onClick={(e) => {
                                                        setSession(e.target.dataset.session)
                                                    }}>
                                                        {e}:00
                                                    </Badge>
                                                )
                                            }
                                            else {
                                                return (
                                                    <Badge data-session={e} variant={session == e ? getBadgeVariantFromLabel('default') : getBadgeVariantFromLabel('personal')} onClick={(e) => {
                                                        setSession(e.target.dataset.session)
                                                    }}>
                                                        {e}:00
                                                    </Badge>
                                                )
                                            }
                                        })}

                                    </PopoverTrigger>
                                    <PopoverContent className="w-70 flex items-center">
                                        ✅目前稽核人數<Badge className="rounded-none ml-1" variant={getBadgeVariantFromLabel('personal')}>
                                            <span>23</span><span>&nbsp;/&nbsp;</span><span>53</span>
                                        </Badge>
                                    </PopoverContent>
                                </Popover>
                            )
                        })}
                        {/* <Popover>
                            <PopoverTrigger >
                                <Badge variant={getBadgeVariantFromLabel('personal')}>
                                    08:00
                                </Badge>
                            </PopoverTrigger>
                            <PopoverContent className="w-70 flex items-center">
                                ✅目前稽核人數<Badge className="rounded-none ml-1" variant={getBadgeVariantFromLabel('personal')}>
                                    <span>23</span><span>&nbsp;/&nbsp;</span><span>53</span>
                                </Badge>
                            </PopoverContent>
                        </Popover>
                        <Popover>
                            <PopoverTrigger >
                                <Badge variant={getBadgeVariantFromLabel('personal')}>
                                    09:00
                                </Badge>
                            </PopoverTrigger>
                            <PopoverContent className="w-70 flex items-center">
                                <div>
                                    ✅目前稽核人數
                                    <Badge className="rounded-none ml-1" variant={getBadgeVariantFromLabel('personal')}>
                                        <span>23</span><span>&nbsp;/&nbsp;</span><span>53</span>
                                    </Badge>
                                </div>

                                <div className='flex flex-1 border-l-2 border-gray-200 ml-2 pl-2 '>

                                    <Button className='h-auto p-1 w-full flex-1' variant={'secondary'}>稽核<ArrowRight size={16}></ArrowRight></Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                        <Popover>
                            <PopoverTrigger >
                                <Badge variant={getBadgeVariantFromLabel('personal')}>
                                    10:00
                                </Badge>
                            </PopoverTrigger>
                            <PopoverContent className="w-70 flex items-center">
                                ✅目前稽核人數<Badge className="rounded-none ml-1" variant={getBadgeVariantFromLabel('personal')}>
                                    <span>23</span><span>&nbsp;/&nbsp;</span><span>53</span>
                                </Badge>
                            </PopoverContent>
                        </Popover>
                        <Popover>
                            <PopoverTrigger >
                                <Badge variant={getBadgeVariantFromLabel('occupied')}>
                                    11:00
                                </Badge>
                            </PopoverTrigger>
                            <PopoverContent className="w-70 flex items-center">
                                ✅目前稽核人數<Badge className="rounded-none ml-1" variant={getBadgeVariantFromLabel('occupied')}>
                                    <span>53</span><span>&nbsp;/&nbsp;</span><span>53</span>
                                </Badge>
                            </PopoverContent>
                        </Popover>
                        <Popover>
                            <PopoverTrigger >
                                <Badge variant={getBadgeVariantFromLabel('personal')}>
                                    12:00
                                </Badge>
                            </PopoverTrigger>
                            <PopoverContent className="w-70 flex items-center">
                                ✅目前稽核人數<Badge className="rounded-none ml-1" variant={getBadgeVariantFromLabel('personal')}>
                                    <span>23</span><span>&nbsp;/&nbsp;</span><span>53</span>
                                </Badge>
                            </PopoverContent>
                        </Popover>
                        <Popover>
                            <PopoverTrigger >
                                <Badge variant={getBadgeVariantFromLabel('personal')}>
                                    13:00
                                </Badge>
                            </PopoverTrigger>
                            <PopoverContent className="w-70 flex items-center">
                                ✅目前稽核人數<Badge className="rounded-none ml-1" variant={getBadgeVariantFromLabel('personal')}>
                                    <span>23</span><span>&nbsp;/&nbsp;</span><span>53</span>
                                </Badge>
                            </PopoverContent>
                        </Popover>
                        <Popover>
                            <PopoverTrigger >
                                <Badge variant={getBadgeVariantFromLabel('personal')}>
                                    14:00
                                </Badge>
                            </PopoverTrigger>
                            <PopoverContent className="w-70 flex items-center">
                                ✅目前稽核人數<Badge className="rounded-none ml-1" variant={getBadgeVariantFromLabel('personal')}>
                                    <span>23</span><span>&nbsp;/&nbsp;</span><span>53</span>
                                </Badge>
                            </PopoverContent>
                        </Popover>
                        <Popover>
                            <PopoverTrigger >
                                <Badge variant={getBadgeVariantFromLabel('personal')}>
                                    15:00
                                </Badge>
                            </PopoverTrigger>
                            <PopoverContent className="w-70 flex items-center">
                                ✅目前稽核人數<Badge className="rounded-none ml-1" variant={getBadgeVariantFromLabel('personal')}>
                                    <span>23</span><span>&nbsp;/&nbsp;</span><span>53</span>
                                </Badge>
                            </PopoverContent>
                        </Popover>
                        <Popover>
                            <PopoverTrigger >
                                <Badge variant={getBadgeVariantFromLabel('personal')}>
                                    16:00
                                </Badge>
                            </PopoverTrigger>
                            <PopoverContent className="w-70 flex items-center">
                                ✅目前稽核人數<Badge className="rounded-none ml-1" variant={getBadgeVariantFromLabel('personal')}>
                                    <span>23</span><span>&nbsp;/&nbsp;</span><span>53</span>
                                </Badge>
                            </PopoverContent>
                        </Popover> */}
                    </div>

                </div>

                {venueDetails.map((venueDetail: any) => {
                    if (session >= venueDetail.use_section && session <= venueDetail.use_section_end) {
                        return (
                            <div className="rounded-lg border bg-card text-card-foreground shadow-sm mt-4 " >
                                <Table >

                                    <TableHeader>
                                        <div className='font-semibold p-2 flex items-center gap-2'>詳細資訊<span className="flex h-2 w-2 rounded-full bg-purple-600" /></div>
                                        <TableRow>
                                            <TableHead >租借單位</TableHead>
                                            <TableHead>人數</TableHead>
                                            <TableHead>租借時段</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="font-medium">{venueDetail.cust_name}</TableCell>
                                            <TableCell>{venueDetail.people_cnt}</TableCell>
                                            <TableCell>{venueDetail.use_section}~{venueDetail.use_section_end}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        )
                    }
                    else {
                        return (
                            <div className="rounded-lg border bg-card text-card-foreground shadow-sm mt-4 " >
                                <Table >

                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">租借單位</TableHead>
                                            <TableHead>人數</TableHead>
                                            <TableHead>租借時段</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="font-bold text-md text-center" colSpan={3}>尚無租借紀錄</TableCell>

                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>

                        )
                    }
                })
                }
            </CardContent>
        </Card>
    )
}