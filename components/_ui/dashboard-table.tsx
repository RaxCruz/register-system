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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import AuditForm from './audit-form';
import DashboardCard from './dashboard-card';
import { object } from 'zod';

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

function Row(props: { mergeVenueData: any, date: any, length: any }) {

    const { mergeVenueData } = props;
    const { date } = props;
    const { length } = props;
    let openState = length === 1 ? true : false
    const [open, setOpen] = React.useState(openState);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
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
                    {mergeVenueData.placename}
                </TableCell>
                <TableCell align="center">{mergeVenueData.placeno}</TableCell>
                <TableCell align="right">{mergeVenueData.people}</TableCell>

            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6} className='p-0'>
                    <Collapse in={open} timeout="auto" unmountOnExit >
                        <Box sx={{ margin: 0 }}>

                            <DashboardCard venueDetails={mergeVenueData.sessions} capacity={mergeVenueData.people} date={date} />

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
// @ts-ignore
export default function DashboardTable(props = { venueMenus: object, venueRentInfos: object, venueStatus: object, date: any }) {
    const { venueMenus } = props
    const { venueRentInfos } = props
    const { venueStatus } = props
    const { date } = props
    let mergeVenueDatas = venueMenus
    // @ts-ignore
    mergeVenueDatas.map((mergeVenueData: any) => {
        mergeVenueData.sessions = []
    })
    // @ts-ignore
    venueStatus.map((venueRentInfo: any) => {
        // mergeVenueData =
        // {
        //     "serno": 7,
        //     "placeno": "C101",
        //     "placename": "101教室"
        // }
        // @ts-ignore
        mergeVenueDatas.map((mergeVenueData: any) => {
            if (venueRentInfo.placename === mergeVenueData.placename) {
                mergeVenueData.sessions.push(...venueRentInfo.details)
            }
        })
    })
    return (
        <TableContainer component={Paper} className=''>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell className='text-md font-bold'>場地</TableCell>
                        <TableCell className='text-md font-bold' align="center"><span className='whitespace-nowrap'>場地</span><span className='whitespace-nowrap'>編號</span></TableCell>
                        <TableCell className='text-md font-bold' align="right"><span className='whitespace-nowrap'>容納</span><span className='whitespace-nowrap'>人數</span></TableCell>


                    </TableRow>
                </TableHead>
                <TableBody>

                    {
                        // @ts-ignore
                        mergeVenueDatas.map((mergeVenueData: any, index: any) => (
                            <Row key={index} mergeVenueData={mergeVenueData} date={date} length={mergeVenueDatas.length} />
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}