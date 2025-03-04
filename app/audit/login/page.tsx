// server component 裡面會呼叫 register-card

//import RegisterCard from "@/components/_ui/register-card";
import { getAuditRecord } from "@/app/actions/audit-api";
import { getNowDate } from "@/app/actions/getTimeStamp";
import { getVenueInfo } from "@/app/actions/venue-info";
import AuditLoginForm from "@/components/_ui/audit-login-form";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Clock,
    Copy,
} from "lucide-react";
import Image from "next/image";
export default async function AuditLogin() {

    const venueDatas = await getVenueInfo('raxcruz', '');

    return (
        <div className="h-dvh overflow-hidden mx-auto flex justify-between flex-col max-w-md ">
            <div className="h-full flex flex-col justify-between overflow-hidden">
                <div className="flex-1 flex flex-col justify-center items-center gap-4">
                    <div className="w-full p-4 flex justify-center">
                        <Image src="/logo.png" width={267} height={112} alt="logo"></Image>
                        {/* <Card className="w-full" x-chunk="dashboard-05-chunk-4">
                            <CardHeader className="flex flex-col items-start bg-muted/50">
                                <div className="grid gap-0.5">
                                    <CardTitle className="group flex items-center gap-2 text-lg">
                                        系統日期: {getNowDate()}
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                                        >
                                            <Copy className="h-3 w-3" />
                                            <span className="sr-only">Copy Order ID</span>
                                        </Button>
                                    </CardTitle>
                                    <CardDescription>Date: November 23, 2023</CardDescription>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-8 gap-1 pl-2 pr-2"
                                    >
                                        <Clock className="h-3.5 w-3.5" />
                                        <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                                            Track Order
                                        </span>
                                    </Button>
                                </div>
                            </CardHeader>
                        </Card> */}
                    </div>
                    <h1 className="scroll-m-20 text-7xl  tracking-tight lg:text-7xl font-['ChenYuluoyan-Thin-Monospaced']">
                        稽核
                    </h1>

                </div>
                <AuditLoginForm />
            </div>
        </div>
    );
}