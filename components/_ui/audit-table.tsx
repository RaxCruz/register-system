'use client'
import {
    Collapsible, CollapsibleContent, CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Card } from "../ui/card";
import { Separator } from "@radix-ui/react-dropdown-menu";

export default function AuditTable() {
    return (

        <div className="w-full sm:p-4">
            <h2 className="p-4">All links</h2>
            <div className="rounded-md sm:border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="font-medium">Name</TableHead>
                            <TableHead className="font-medium">Link</TableHead>
                            <TableHead className="font-medium">Views</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <Collapsible asChild>
                            <>
                                <TableRow>
                                    <TableCell>王情</TableCell>
                                    <TableCell>黑馬</TableCell>
                                    <TableCell>
                                        <CollapsibleTrigger asChild>
                                            <div>點</div>
                                        </CollapsibleTrigger>
                                    </TableCell>
                                </TableRow>
                                <CollapsibleContent asChild>
                                    <h1>你好</h1>
                                </CollapsibleContent>
                            </>
                        </Collapsible>
                        <Collapsible asChild>
                            <>
                                <TableRow>
                                    <TableCell>王情</TableCell>
                                    <TableCell>黑馬</TableCell>
                                    <TableCell>
                                        <CollapsibleTrigger asChild>
                                            <div className="">點</div>
                                        </CollapsibleTrigger>
                                    </TableCell>
                                </TableRow>
                                <CollapsibleContent asChild>
                                    <TableRow>
                                        <TableCell>AA</TableCell>
                                        <TableCell>BB</TableCell>
                                        <TableCell>CC</TableCell>
                                    </TableRow>
                                </CollapsibleContent>
                            </>
                        </Collapsible>
                        <Collapsible asChild>
                            <>
                                <TableRow>
                                    <TableCell>王情</TableCell>
                                    <TableCell>黑馬</TableCell>
                                    <TableCell>
                                        <CollapsibleTrigger asChild>
                                            <h1>jij</h1>
                                        </CollapsibleTrigger>
                                    </TableCell>
                                </TableRow>
                                <CollapsibleContent asChild>
                                    <Card>dd</Card>
                                </CollapsibleContent>
                            </>
                        </Collapsible>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
