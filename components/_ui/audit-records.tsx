import { ComponentProps, useEffect } from "react"
import formatDistanceToNow from "date-fns/formatDistanceToNow"

import { cn } from "@/lib/utils"
import { ScrollArea } from "../ui/scroll-area"
import { Badge } from "../ui/badge"
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card"
import { AlarmClock } from "lucide-react"
import { getAuditRecord } from "@/app/actions/audit-api"


export default async function AuditRecords(props: { audit_details: any }) {

    // let { audit_details } = props;

    let audit_records = await getAuditRecord('')
    //let audit_details = audit_records.details


    //audit_details = await getAuditDetails()
    console.log(audit_records)
    return (
        <Card className="shadow-none rounded-none">
            <CardHeader>
                {/* <CardTitle>Product Details</CardTitle> */}
                <CardDescription>
                    稽核歷史紀錄:<span> {audit_details.length}</span><span>筆</span>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[50dvh]">
                    <div className="flex flex-col gap-2 pt-0">
                        {audit_details.sort((a: any, b: any) => new Date(b.create_date) - new Date(a.create_date)).map((audit_detail: any, index: any) => (
                            <button
                                key={index}
                                className={cn(
                                    "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                                )}
                            >
                                <div className="flex w-full flex-col gap-1">
                                    <div className="flex items-center">
                                        <div className="flex items-center gap-2">
                                            <div className="font-semibold">{audit_detail.emp_name}</div>
                                            {/* {!item.read && (
                    <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                  )} */}
                                        </div>
                                        <div
                                            className={cn(
                                                "ml-auto text-xs",
                                            )}
                                        >
                                            {timeAgo(audit_detail.create_date)}
                                        </div>
                                    </div>
                                    <div className="text-xs font-medium"><span>🔸</span>{audit_detail.create_date}</div>
                                </div>
                                <div className=" text-xs text-muted-foreground break-normal">
                                    {audit_detail.auditRemark}
                                </div>
                                <Badge variant={getBadgeVariantFromLabel('personal')} className="flex items-center gap-1">
                                    🙍‍♂️<span>{audit_detail.real_people}</span>
                                </Badge>
                                {/* 
                                <div className="flex items-center gap-2">
                                    {[1, 2, 3, 4, 5].map((label) => (
                                        <Badge key={label} variant={getBadgeVariantFromLabel('work')}>
                                            {label}
                                        </Badge>
                                    ))}
                                </div> */}

                            </button>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card >
    )
}

function getBadgeVariantFromLabel(
    label: string
): ComponentProps<typeof Badge>["variant"] {
    if (["work"].includes(label.toLowerCase())) {
        return "default"
    }

    if (["personal"].includes(label.toLowerCase())) {
        return "outline"
    }

    return "secondary"
}






function timeAgo(inputTime: any) {
    let currentTime = new Date();
    let givenTime = new Date(inputTime);
    let timeDifference = currentTime - givenTime;

    const oneSecond = 1000;
    const oneMinute = 60 * oneSecond;
    const oneHour = 60 * oneMinute;
    const oneDay = 24 * oneHour;
    const oneYear = 365 * oneDay;

    if (timeDifference < oneMinute) {
        const seconds = Math.floor(timeDifference / oneSecond);
        return `${seconds}秒前`;
    } else if (timeDifference < oneHour) {
        const minutes = Math.floor(timeDifference / oneMinute);
        return `${minutes}分鐘前`;
    } else if (timeDifference < oneDay) {
        const hours = Math.floor(timeDifference / oneHour);
        return `${hours}小時前`;
    } else {
        currentTime.setHours(0, 0, 0, 0);
        givenTime.setHours(0, 0, 0, 0);
        timeDifference = currentTime - givenTime;
        if (timeDifference < 2 * oneDay) {
            return `一天前`;
        } else if (timeDifference < oneYear) {
            const days = Math.floor(timeDifference / oneDay);
            return `${days}天前`;
        } else if (timeDifference < 2 * oneYear) {
            return `一年前`;
        } else {
            const years = Math.floor(timeDifference / oneYear);
            return `${years}年前`;
        }
    }
}
