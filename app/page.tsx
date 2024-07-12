import Image from "next/image"
import Link from "next/link"
import {
  File,
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
import { getAuditRecord, uploadAuditRecord } from "./actions/audit-api"
import SearchPlaceSelect from "@/components/_ui/seach-place-select"
import TableFilter from "@/components/_ui/table-filter"

export default async function Dashboard({
  params,
  searchParams,
}: {
  params: { raceId: string };
  searchParams: { filter: string };
}) {
  let audit_records = await getAuditRecord('')
  audit_records = audit_records.filter((audit_record: any) => {
    if (searchParams.filter) {
      return audit_record.placeno.toLowerCase().includes(searchParams.filter.toLowerCase());
    }
    return true;
  });
  return (
    <TooltipProvider>
      <div className="flex min-h-screen  flex-col bg-muted/40">
        <main className="grid flex-1 items-start gap-4  sm:py-0 md:gap-8 md:container">
          <Tabs defaultValue="all">
            <div className="flex items-center p-4">
              <TabsList>
                <TabsTrigger value="all">全部</TabsTrigger>
                <TabsTrigger value="active">已稽核</TabsTrigger>
                <TabsTrigger value="draft">尚未稽核</TabsTrigger>
                <TabsTrigger value="archived" className="hidden sm:flex">
                  Archived
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <SearchPlaceSelect />
                <Button size="sm" variant="outline" className="h-7 gap-1">
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                  </span>
                </Button>
                <Button size="sm" className="h-7 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Product
                  </span>
                </Button>
              </div>
            </div>
            <header className="px-2">
              <TableFilter />
            </header>
            <TabsContent value="all">
              <Card className="">
                <CardHeader>
                  <CardTitle>稽核</CardTitle>
                  <CardDescription>
                    Manage your products and view their sales performance.
                  </CardDescription>
                </CardHeader>
                <CardContent className="overflow-hidden p-3 w-[100vw] md:container">
                  <AuditTable audit_records={audit_records} />
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    products
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="active">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>稽核</CardTitle>
                  <CardDescription>
                    Manage your products and view their sales performance.
                  </CardDescription>
                </CardHeader>
                <CardContent className="overflow-hidden p-3 w-[100vw] md:container">
                  <AuditTable audit_records={getIsAuditTable(true, audit_records)} />
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    products
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="draft">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>稽核</CardTitle>
                  <CardDescription>
                    Manage your products and view their sales performance.
                  </CardDescription>
                </CardHeader>
                <CardContent className="overflow-hidden p-3 w-[100vw] md:container">
                  <AuditTable audit_records={getIsAuditTable(false, audit_records)} />
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    products
                  </div>
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
  //console.log(res)
  return res
}