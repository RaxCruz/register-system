'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Checkbox } from '../ui/checkbox';
import clsx from 'clsx';
import { uploadAuditRecord } from '@/app/actions/audit-api';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { randomInt } from 'crypto';
import { getCookie } from 'cookies-next';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Check, RocketIcon } from 'lucide-react';

export default function AuditForm(props: { audit_record: any, testing: any }) {
    const { reset } = useForm();
    const router = useRouter();
    const { testing } = props;
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const username = getCookie('username')
    const userID = getCookie('id')
    const [loading, setLoading] = useState(0)
    const [open, setOpen] = useState(false);
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams?.toString());
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );
    const { audit_record } = props;
    const audit_details = audit_record.details;
    const formSchema = z.object({
        auditID: z.string(),
        auditNum: z.string().min(1, {
            message: "稽核人數為必填欄位",
        }),
        auditMemo: z.string()
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            auditID: '',
            auditNum: '',
            auditMemo: '',
        },
    })

    const delay = (delayInms: any) => {
        return new Promise(resolve => setTimeout(resolve, delayInms));
    };
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const req = [
            {
                "placeused_serno": audit_record.placeused_serno,
                "place_serno": audit_record.place_serno,
                "emp_eser": userID,
                "real_people": values.auditNum,
                "auditRemark": values.auditMemo,
                "use_date": audit_record.use_date,
                "use_usection": audit_record.use_section,
            }
        ]
        setLoading(1)

        await uploadAuditRecord(req)
        await delay(3000)
        setLoading(2)

        await delay(2000)
        setLoading(0)
        setOpen(true)
        form.reset({ auditNum: "", auditMemo: "" })
        testing('')
    }

    return (
        <Card x-chunk="dashboard-07-chunk-0" className='shadow-none rounded-none'>
            <CardHeader>
                {/* <CardTitle>Product Details</CardTitle> */}
                <CardDescription>
                    上次稽核時間:<span> {audit_details.length ? audit_details[0].create_date : '尚未有稽核紀錄'}</span>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="auditID"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>稽核人員</FormLabel>
                                    <FormControl>
                                        <Input className="text-base" placeholder={username} {...field} disabled type="text" />
                                    </FormControl>
                                    <FormDescription>

                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="auditNum"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>稽核人數</FormLabel>
                                    <FormControl>
                                        <Input className="text-base" placeholder='' {...field} />
                                    </FormControl>
                                    <FormDescription>

                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="auditMemo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>備註</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder='' {...field} />
                                    </FormControl>
                                    <FormDescription>

                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {loading === 0 ? <Button type="submit">稽核</Button> : loading === 1 ? <Button disabled><svg className="w-4 h-4 mr-2 text-indigo-300 animate-spin" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
                            width="24" height="24">
                            <path
                                d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                                stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path
                                d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                                stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900">
                            </path>
                        </svg>稽核中</Button> : <Button disabled><Check size={16} className='mr-2'></Check>稽核成功</Button>}

                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}