/* eslint-disable */
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
import { getNowDate } from '@/app/actions/getTimeStamp';
import { getCookie } from 'cookies-next';
export default function DashboardCard(props: { venueDetails: any, capacity: any, date: any }) {
    const [session, setSession] = useState(8)
    const { venueDetails } = props
    const { capacity } = props
    const { date } = props

    let people_cnt = new Array(15).fill(0);//預計人數
    let ck_cnt = new Array(15).fill(0);//報到人數
    const searchDate = date
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
            return "success"
        }

        return "secondary"
    }
    return (
        <Card x-chunk="dashboard-07-chunk-0" className="shadow-none rounded-none border-none">
            <CardHeader className='px-3'>
                {/* <CardTitle>Product Details</CardTitle> */}
                <CardDescription >

                    查詢日期:<span> {searchDate ? searchDate : getNowDate()}</span>
                </CardDescription>
            </CardHeader>
            <CardContent className='px-3'>
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
                        🧩綠色為有預訂時段
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        {Array.from([8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22], (e, i) => {
                            let checked = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
                            return (
                                <Popover key={i}>
                                    <PopoverTrigger >
                                        {venueDetails.map((venueDetail: any, index: any) => {
                                            let isRent = false
                                            if (e >= venueDetail.use_section && e <= venueDetail.use_section_end) {
                                                people_cnt[e - 8] = venueDetail.people_cnt
                                                ck_cnt[e - 8] = venueDetail.ck_cnt
                                                checked[e - 8] = true
                                                isRent = true
                                            }

                                        })

                                        }
                                        {
                                            checked[e - 8] ? <Badge data-session={e} variant={session == e ? getBadgeVariantFromLabel('default') : getBadgeVariantFromLabel('rent')} onClick={(e) => {
                                                // @ts-ignore
                                                setSession(e.target.dataset.session)
                                            }}>
                                                {e}:00
                                            </Badge> : <Badge data-session={e} variant={session == e ? getBadgeVariantFromLabel('default') : getBadgeVariantFromLabel('personal')} onClick={(e) => {
                                                // @ts-ignore
                                                setSession(e.target.dataset.session)
                                            }}> {e}:00</Badge>
                                        }
                                    </PopoverTrigger>

                                    <PopoverContent className="w-70 flex items-center">
                                        ✅報到/申請人數<Badge className="rounded-none ml-1" variant={getBadgeVariantFromLabel('personal')}>
                                            <span>{ck_cnt[session - 8]}</span><span>&nbsp;/&nbsp;</span><span>{people_cnt[session - 8]}</span>
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
                            {
                                venueDetails.map((venueDetail: any, index: any) => {
                                    //console.log("測試:", venueDetail.use_section, session, session > venueDetail.use_section, typeof (venueDetail.use_section))
                                    // if (session >= parseInt(venueDetail.use_section, 10) && session <= parseInt(venueDetail.use_section_end, 10)) {

                                    return (

                                        <TableRow key={index}>
                                            <TableCell className="font-medium">{venueDetail.cust_name}</TableCell>
                                            <TableCell>{venueDetail.people_cnt}</TableCell>
                                            <TableCell>{venueDetail.use_section}:00~{venueDetail.use_section_end}:00</TableCell>
                                        </TableRow>

                                    )
                                    // }
                                })}
                        </TableBody>
                    </Table>
                </div>

            </CardContent>
        </Card>
    )
}