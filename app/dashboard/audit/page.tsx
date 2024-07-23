import Image from "next/image"
import Link from "next/link"
import {
    File,
    Forward,
    Home,
    LineChart,
    ListFilter,
    MoreHorizontal,
    Package,
    Package2,
    PanelLeft,
    PlusCircle,
    Search,
    Settings,
    ShoppingCart,
    Users2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
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
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
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
import SearchPlaceSelect from "@/components/_ui/seach-place-select"
import TableFilter from "@/components/_ui/table-filter"
import { getAuditRecord } from "@/app/actions/audit-api"
import { getCookie } from "cookies-next"
import { cookies } from "next/headers"
import { getVenueMenuRead } from "@/app/actions/venue-info"
import SearchForm from "@/components/_ui/search-form"
import { getNowDate } from "@/app/actions/getTimeStamp"
import LogoutDropdown from "@/components/_ui/logout-dropdown"

export default async function Dashboard({
    params,
    searchParams,
}: {
    params: { raceId: string };
    searchParams: { place: string, date: string };
}) {
    const username = getCookie('username', { cookies })
    // const userID = getCookie('username', { cookies })
    let audit_records
    if (searchParams.date)
        audit_records = await getAuditRecord(searchParams.date)
    else
        audit_records = await getAuditRecord(getNowDate())
    const venueMenus = await getVenueMenuRead('raxcruz')
    //console.log("debug", getIsAuditTable(false, audit_records))

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
                    <h1 className="text-xl font-semibold">稽核</h1>
                    <LogoutDropdown username={username} />
                </header>
                <main className="grid flex-1 items-start gap-4  sm:py-0 md:gap-8 md:container">

                    <Tabs defaultValue="all">
                        <header className="p-2">
                            <SearchForm venueMenus={venueMenus} />
                        </header>
                        <div className="flex items-center p-4">
                            <TabsList className="hidden">

                                <TabsTrigger value="draft" className="hidden">尚未稽核</TabsTrigger>
                                <TabsTrigger value="active" className="hidden">已稽核</TabsTrigger>
                                <TabsTrigger value="all" className="hidden">全部</TabsTrigger>


                            </TabsList>
                            <div className="ml-auto flex items-center gap-2">
                                <Link href='/dashboard'>
                                    <Button size="sm" className="h-7 gap-1">
                                        <span className="">
                                            返回儀表板
                                        </span>
                                        <Forward size={16}></Forward>
                                    </Button>
                                </Link>
                            </div>
                        </div>


                        <TabsContent value="all">
                            <Card className="">
                                <CardHeader>
                                    <h1 className="text-lg font-semibold">查詢結果</h1>
                                    <CardDescription>

                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="overflow-hidden p-3 w-[100vw] md:container">
                                    <AuditTable audit_records={audit_records} searchParams={searchParams} tabs='all' />
                                </CardContent>
                                <CardFooter>
                                    {/* <div className="text-xs text-muted-foreground">
                                        Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                                        products
                                    </div> */}
                                </CardFooter>
                            </Card>
                        </TabsContent>
                        <TabsContent value="active">
                            <Card x-chunk="dashboard-06-chunk-0">
                                <CardHeader>

                                    <h1 className="text-lg font-semibold">查詢結果</h1>
                                </CardHeader>
                                <CardContent className="overflow-hidden p-3 w-[100vw] md:container">
                                    <AuditTable audit_records={getIsAuditTable(true, audit_records)} searchParams={searchParams} tabs='active' />
                                </CardContent>
                                <CardFooter>

                                </CardFooter>
                            </Card>
                        </TabsContent>
                        <TabsContent value="draft">
                            <Card x-chunk="dashboard-06-chunk-0">
                                <CardHeader>
                                    <h1 className="text-lg font-semibold">查詢結果</h1>

                                </CardHeader>
                                <CardContent className="overflow-hidden p-3 w-[100vw] md:container">
                                    <AuditTable audit_records={getIsAuditTable(false, audit_records)} searchParams={searchParams} tabs='draft' />
                                </CardContent>
                                <CardFooter>

                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </main>
            </div>
            {/* </div> */}
        </TooltipProvider>
    )
}

function getIsAuditTable(isAudit: boolean, audit_records: any) {
    if (audit_records.length == 0) return audit_records
    let res = []
    if (isAudit) {
        res = audit_records.map((audit_record: any) => {
            if (audit_record.details.length > 0) {
                return audit_record
            }
        }).filter(Boolean);
    } else {
        res = audit_records.map((audit_record: any) => {
            if (audit_record.details.length === 0) {
                return audit_record
            }
        }).filter(Boolean);
    }

    return res
}