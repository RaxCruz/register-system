// server component 裡面會呼叫 register-card

import { register } from "@/app/actions/register-api";
import { getVenueInfo } from "@/app/actions/venue-info";
import RegisterForm from "@/components/_ui/register-form";
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
    Clock1,
    Copy,
} from "lucide-react";

const a = register('raxcruz', {})
export default async function LoginForm({
    params,
    searchParams,
}: {
    params: { raceId: string };
    searchParams: { placeused_serno: string };
}) {
    const placeused_serno = searchParams.placeused_serno;
    const venueDatas = await getVenueInfo('raxcruz', '');
    return (
        <div className="h-dvh overflow-hidden mx-auto flex justify-between flex-col max-w-md md:max-w-xl">
            <div className="h-full flex flex-col justify-between overflow-hidden">
                <div className="flex-1 flex flex-col justify-center items-center">
                    <h1 className="scroll-m-20 text-7xl  tracking-tight lg:text-7xl font-['ChenYuluoyan-Thin-Monospaced']">
                        報到
                    </h1>
                    <div className="w-full p-4">
                        <Card className="w-full" x-chunk="dashboard-05-chunk-4">
                            <CardHeader className="flex flex-col items-start bg-muted/50">
                                <div className="grid gap-0.5">
                                    <CardTitle className="group flex items-center gap-2 text-lg">
                                        <svg data-testid="geist-icon" height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16" style={{ color: 'green' }}><path fillRule="evenodd" clipRule="evenodd" d="M13.7496 1.89953C13.2746 1.32956 12.571 1 11.8291 1H4.17093C3.42897 1 2.72535 1.32956 2.25037 1.89955L1.07944 3.30467C0.705039 3.75395 0.5 4.32028 0.5 4.90512V5V13.5V15H2H6.04951H9.95049H14H15.5V13.5V5V4.90513C15.5 4.32029 15.295 3.75395 14.9205 3.30466L13.7496 1.89953ZM14 5V4.90513C14 4.67119 13.918 4.44466 13.7682 4.26494L14.9205 3.30466L13.7682 4.26494L12.5973 2.85981C12.4073 2.63182 12.1258 2.5 11.8291 2.5H4.17093C3.87415 2.5 3.5927 2.63182 3.4027 2.85982L2.23178 4.26494C2.08202 4.44465 2 4.67119 2 4.90512V5C2 5.82843 2.67157 6.5 3.5 6.5C4.32843 6.5 5 5.82843 5 5H6.5C6.5 5.82843 7.17157 6.5 8 6.5C8.82843 6.5 9.5 5.82843 9.5 5H11C11 5.82843 11.6716 6.5 12.5 6.5C13.3284 6.5 14 5.82843 14 5ZM14 7.59865C13.5587 7.85391 13.0464 8 12.5 8C11.604 8 10.7997 7.60718 10.25 6.98437C9.70029 7.60718 8.89602 8 8 8C7.10398 8 6.29971 7.60718 5.75 6.98437C5.20029 7.60718 4.39602 8 3.5 8C2.95357 8 2.44126 7.85391 2 7.59865V13.5H6V12C6 10.8954 6.89543 10 8 10C9.10457 10 10 10.8954 10 12V13.5H14V7.59865ZM8.5 12V13.5H7.5V12C7.5 11.7239 7.72386 11.5 8 11.5C8.27614 11.5 8.5 11.7239 8.5 12Z" fill="currentColor"></path></svg>
                                        棒球場
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                                        >
                                            <Copy className="h-3 w-3" />
                                            <span className="sr-only">Copy Order ID</span>
                                        </Button>
                                    </CardTitle>
                                    <CardDescription className="flex items-center gap-2"><svg data-testid="geist-icon" height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16" style={{ color: 'currentcolor' }}><path fillRule="evenodd" clipRule="evenodd" d="M2.5 2.25C2.5 1.83579 2.83579 1.5 3.25 1.5H6.75C7.16421 1.5 7.5 1.83579 7.5 2.25V7.5V14.5H2.5V2.25ZM7.5 16H1.75H1V15.25V2.25C1 1.00736 2.00736 0 3.25 0H6.75C7.99264 0 9 1.00736 9 2.25V6.5H12.25C13.4926 6.5 14.5 7.50736 14.5 8.75V15.25V16H13.75H9H8.25H7.5ZM9 14.5H13V8.75C13 8.33579 12.6642 8 12.25 8H9V14.5ZM4.75 3.5H4V5H4.75H5.25H6V3.5H5.25H4.75ZM4 6.5H4.75H5.25H6V8H5.25H4.75H4V6.5ZM10.75 9.5H10V11H10.75H11.25H12V9.5H11.25H10.75ZM4 9.5H4.75H5.25H6V11H5.25H4.75H4V9.5Z" fill="currentColor"></path></svg>嘉義縣政府</CardDescription>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-8 gap-1 pl-2 pr-2"
                                    >
                                        <Clock className="h-3.5 w-3.5" />
                                        <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                                            {venueDatas[0].use_date}
                                        </span>
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-8 gap-1 pl-2 pr-2 bg-green-600 text-white"
                                    >

                                        <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                                            {venueDatas[0].use_section}~{venueDatas[0].use_section_end}
                                        </span>
                                    </Button>
                                </div>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
                <RegisterForm venueDatas={venueDatas} />
            </div>
        </div>
    );
}