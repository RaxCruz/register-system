'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import AuditForm from './audit-form';
import { Button } from "@/components/ui/button"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Badge } from '../ui/badge';
import { AlignStartVertical, CheckCheck, FileClock, HardDriveUpload, Kanban, ListChecks } from 'lucide-react';
import AuditRecords from './audit-records';

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
    price: number,
) {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
        price,
        history: [
            {
                date: '2020-01-05',
                customerId: '11091700',
                amount: 3,
            },
            {
                date: '2020-01-02',
                customerId: 'Anonymous',
                amount: 1,
            },
        ],
    };
}

function Row(props: { audit_record: any }) {
    const { audit_record } = props;
    const [open, setOpen] = React.useState(false);
    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} >
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {audit_record.placename}
                </TableCell>
                <TableCell align="right">{audit_record.use_section}</TableCell>
                <TableCell align="right">{audit_record.people_cnt}</TableCell>
                <TableCell align="right">{audit_record.real_people}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6} className='p-0'>
                    <Collapse in={open} timeout="auto" unmountOnExit >
                        <Box sx={{ margin: 0, border: `${audit_record.details.length ? 'solid green 2px' : 'solid red 2px'}`, position: 'relative' }}>
                            <Tabs defaultValue="account" className="h-full" >
                                <TabsList className="grid grid-cols-2 absolute right-3 top-5 p-0 h-auto w-auto">
                                    <TabsTrigger value="account" className='data-[state=active]:bg-green-300'><HardDriveUpload size={16} /></TabsTrigger>
                                    <TabsTrigger value="password" className='data-[state=active]:bg-green-300'><AlignStartVertical size={16} /></TabsTrigger>
                                </TabsList>
                                <TabsContent value="account" className='mt-0'>
                                    <AuditForm audit_details={audit_record.details} />
                                </TabsContent>
                                <TabsContent value="password" className='mt-0'>
                                    <AuditRecords audit_details={audit_record.details} />
                                </TabsContent>
                            </Tabs>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const rows = [
    createData('羽球教室', 159, 6.0, 24, 4.0, 3.99),
    createData('體育場', 237, 9.0, 37, 4.3, 4.99),
    createData('游泳池', 262, 16.0, 24, 6.0, 3.79),
    createData('體育場B', 305, 3.7, 67, 4.3, 2.5),
    createData('田徑場', 356, 16.0, 49, 3.9, 1.5),
];

export default function AuditTable(props: { audit_records: any }) {

    const ass = [{ "placeused_serno": "30169", "place_serno": "7", "placeno": "C101", "placename": "101教室", "cust_name": "多田測試3", "use_date": "2024/7/26 上午 12:00:00", "use_section": "8", "people_cnt": "50", "ck_person": "王小明", "ck_create_date": "2024-07-10 13:12:26", "details": [{ "emp_eser": "1", "emp_name": "吳威佑", "real_people": "48", "auditRemark": "", "create_date": "2024-07-10 14:40:13" }, { "emp_eser": "1", "emp_name": "吳威佑", "real_people": "48", "auditRemark": "test", "create_date": "2024-07-10 14:41:16" }] }, { "placeused_serno": "30170", "place_serno": "7", "placeno": "C101", "placename": "101教室", "cust_name": "多田測試3", "use_date": "2024/7/26 上午 12:00:00", "use_section": "13", "people_cnt": "50", "ck_person": "", "ck_create_date": "", "details": [] }]
    const { audit_records } = props;
    //console.log(audit_records)
    return (
        <TableContainer component={Paper} className=''>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell className='text-md font-bold'>場地</TableCell>
                        <TableCell className='text-md font-bold' align="right">時段</TableCell>
                        <TableCell className='text-md font-bold' align="right">人數</TableCell>
                        <TableCell className='text-md font-bold' align="right">稽核人數</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {audit_records.map((audit_record: any, index: number) => (
                        <Row key={index} audit_record={audit_record} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}