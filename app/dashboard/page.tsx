import {
    ArrowLeft,
    ArrowRight,
    File,
    ListFilter,
    PlusCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import AuditTable from "@/components/_ui/audit-mui-table"
import SearchForm from "@/components/_ui/search-form"
import DashboardTable from "@/components/_ui/dashboard-table"
import { getVenueMenuRead, getVenueRentInfo, getVenueStatus } from "../../app/actions/venue-info"
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getCookie } from "cookies-next"
import Link from "next/link"
import Image from "next/image"
import LogoutDropdown from "@/components/_ui/logout-dropdown"
import { getNowDate } from "../actions/getTimeStamp"
export default async function Dashboard({
    params,
    searchParams,
}: {
    params: { raceId: string };
    searchParams: { place: string, date: string };
}) {

    let venueStatus
    let searchVenueStatus
    let venueMenus = await getVenueMenuRead('raxcruz')
    searchVenueStatus = venueMenus
    let venueRentInfos
    if (searchParams.date) {
        venueStatus = await getVenueStatus('raxcruz', searchParams.date)
        venueRentInfos = await getVenueRentInfo('raxcruz', searchParams.date)
    }
    else {
        venueStatus = await getVenueStatus('raxcruz', getNowDate())
        venueRentInfos = await getVenueRentInfo('raxcruz', getNowDate())
    }

    if (searchParams.place && searchParams.place != 'all')
        venueMenus = venueMenus.filter((item: any) => item.placename === searchParams.place);

    const username = getCookie('username', { cookies })
    //const venueMenus = await getVenueMenuRead('raxcruz')

    //const venueStatus = await getVenueStatus('raxcruz', '')
    return (
        <TooltipProvider>
            <div className="flex min-h-screen  flex-col bg-muted/40">
                <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4 justify-between ">
                    <Button
                        variant="outline"
                        size="icon"
                        className="overflow-hidden rounded-full h-8 w-8 opacity-0"

                    >
                        <Image
                            src="/placeholder-user.jpg"
                            width={36}
                            height={36}
                            alt="Avatar"
                            className="overflow-hidden rounded-full"
                        />
                    </Button>
                    <h1 className="text-xl font-semibold">儀表板</h1>
                    <LogoutDropdown username={username} />
                </header>
                <div className="p-2 md:container bg-muted/40">
                    <SearchForm venueMenus={searchVenueStatus} />
                </div>
                <main className="grid flex-1 items-start gap-4  sm:py-0 md:gap-8 md:container">
                    <Tabs defaultValue="filter">
                        <div className="flex items-center p-4">
                            <TabsList className="">
                                <TabsTrigger value="filter" className="">已租借場地</TabsTrigger>
                                <TabsTrigger value="all" className="">全部</TabsTrigger>

                            </TabsList>
                            <div className="ml-auto flex items-center gap-2">
                                <Link href="/dashboard/audit">
                                    <Button size="sm" className="h-7 gap-1 ">
                                        <span className="">
                                            前往稽核
                                        </span>
                                        <ArrowRight className="h-3.5 w-3.5 " />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <TabsContent value="all">
                            <Card className="rounded-none">
                                <CardHeader>
                                    <h1 className="text-lg font-semibold">查詢結果</h1>
                                    <CardDescription>

                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="overflow-hidden p-3 w-[100vw] md:container">
                                    <DashboardTable venueMenus={venueMenus} venueRentInfos={venueRentInfos} venueStatus={venueStatus} date={searchParams.date} />
                                </CardContent>
                                <CardFooter>
                                    {/* <div className="text-xs text-muted-foreground">
                                        Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                                        products
                                    </div> */}
                                </CardFooter>
                            </Card>
                        </TabsContent>
                        <TabsContent value="filter">
                            <Card className="rounded-none">
                                <CardHeader>
                                    <h1 className="text-lg font-semibold">查詢結果</h1>
                                    <CardDescription>

                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="overflow-hidden p-3 w-[100vw] md:container">
                                    <DashboardTable venueMenus={getFilterVenue(venueRentInfos, venueMenus)} venueRentInfos={venueRentInfos} venueStatus={venueStatus} date={searchParams.date} />
                                </CardContent>
                                <CardFooter>
                                    {/* <div className="text-xs text-muted-foreground">
                                        Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                                        products
                                    </div> */}
                                </CardFooter>
                            </Card>
                        </TabsContent>

                    </Tabs>
                </main>
            </div>
        </TooltipProvider>
    )
}


function getFilterVenue(venueRentInfos: any, venueMenus: any) {
    const placenosB = venueRentInfos.map((item: any) => item.placeno);
    return venueMenus.filter((item: any) => placenosB.includes(item.placeno));
}