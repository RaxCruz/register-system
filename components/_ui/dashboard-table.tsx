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
import { getVenueMenu } from '@/app/actions/venue-info';
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

function Row(props: { venueMenu: ReturnType<typeof createData> }) {
    const { venueMenu } = props;
    const [open, setOpen] = React.useState(false);

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
                    {venueMenu.placename}
                </TableCell>
                <TableCell align="right">{ }</TableCell>
                <TableCell align="right">{ }</TableCell>
                <TableCell align="right">{ }</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6} className='p-0'>
                    <Collapse in={open} timeout="auto" unmountOnExit >
                        <Box sx={{ margin: 0 }}>
                            <DashboardCard venueDetails={venueMenu.sessions} />

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

export default function DashboardTable(props = { venueMenus: object, venueRentInfos: object }) {
    const { venueMenus } = props
    const { venueRentInfos } = props

    // const mergeVenues = [
    //     {
    //         'placename':"101",
    //          'sessions':[
    //             {session},{},{}
    //          ]
    //     }
    // ]

    let mergeVenueDatas = venueMenus
    console.log(typeof (mergeVenueDatas))
    mergeVenueDatas.map((mergeVenueData: any) => {
        mergeVenueData.sessions = []
    })
    console.log(venueRentInfos)
    venueRentInfos.map((venueRentInfo: any) => {
        // mergeVenueData =
        // {
        //     "serno": 7,
        //     "placeno": "C101",
        //     "placename": "101教室"
        // }
        mergeVenueDatas.map((mergeVenueData: any) => {
            if (venueRentInfo.placename === mergeVenueData.placename) {
                mergeVenueData.sessions.push(venueRentInfo)
            }
        })
    })
    console.log(mergeVenueDatas)
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
                    {mergeVenueDatas.map((mergeVenueData: any, index: any) => (
                        <Row key={index} venueMenu={mergeVenueData} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}