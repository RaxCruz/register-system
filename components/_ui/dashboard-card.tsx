
import { Badge } from '../ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ComponentProps } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';

export default function DashboardCard() {
    function getBadgeVariantFromLabel(
        label: string
    ): ComponentProps<typeof Badge>["variant"] {
        if (["work"].includes(label.toLowerCase())) {
            return "default"
        }

        if (["personal"].includes(label.toLowerCase())) {
            return "outline"
        }

        if (["occupied"].includes(label.toLowerCase())) {
            return "destructive"
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
                        🔺紅色為已額滿時段
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <Popover>
                            <PopoverTrigger >
                                <Badge variant={getBadgeVariantFromLabel('personal')}>
                                    08:00
                                </Badge>
                            </PopoverTrigger>
                            <PopoverContent className="w-70 flex items-center">
                                ✅目前預約人數<Badge className="rounded-none ml-1" variant={getBadgeVariantFromLabel('personal')}>
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
                                ✅目前預約人數<Badge className="rounded-none ml-1" variant={getBadgeVariantFromLabel('personal')}>
                                    <span>23</span><span>&nbsp;/&nbsp;</span><span>53</span>
                                </Badge>
                            </PopoverContent>
                        </Popover>
                        <Popover>
                            <PopoverTrigger >
                                <Badge variant={getBadgeVariantFromLabel('personal')}>
                                    10:00
                                </Badge>
                            </PopoverTrigger>
                            <PopoverContent className="w-70 flex items-center">
                                ✅目前預約人數<Badge className="rounded-none ml-1" variant={getBadgeVariantFromLabel('personal')}>
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
                                ✅目前預約人數<Badge className="rounded-none ml-1" variant={getBadgeVariantFromLabel('occupied')}>
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
                                ✅目前預約人數<Badge className="rounded-none ml-1" variant={getBadgeVariantFromLabel('personal')}>
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
                                ✅目前預約人數<Badge className="rounded-none ml-1" variant={getBadgeVariantFromLabel('personal')}>
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
                                ✅目前預約人數<Badge className="rounded-none ml-1" variant={getBadgeVariantFromLabel('personal')}>
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
                                ✅目前預約人數<Badge className="rounded-none ml-1" variant={getBadgeVariantFromLabel('personal')}>
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
                                ✅目前預約人數<Badge className="rounded-none ml-1" variant={getBadgeVariantFromLabel('personal')}>
                                    <span>23</span><span>&nbsp;/&nbsp;</span><span>53</span>
                                </Badge>
                            </PopoverContent>
                        </Popover>
                    </div>

                </div>
            </CardContent>
        </Card>
    )
}