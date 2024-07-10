import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

export default function DashboardCard() {
    return (
        <Card x-chunk="dashboard-07-chunk-0" className=" shadow-none rounded-none border-2  border-red-400">
            <CardHeader>
                {/* <CardTitle>Product Details</CardTitle> */}
                <CardDescription>
                    上次稽核時間:<span> 2024-06-24 16:15:15</span>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <h1>jiji</h1>
            </CardContent>
        </Card>
    )
}