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


export default function AuditForm(props: { audit_details: any }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );
    const { audit_details } = props;
    const formSchema = z.object({
        auditName: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
        auditNum: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
        auditMemo: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
        auditTime: z.string(),
        isAudit: z.boolean(),
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            auditName: '',
            auditNum: '',
            auditMemo: '',
            auditTime: '',
            isAudit: false,
        },
    })
    function getRandomString(length: any) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }
        return result;
    }

    // 示例：生成一个长度为 10 的随机字符串
    console.log(getRandomString(10));

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await uploadAuditRecord('')
        router.replace('')
        router.push(pathname + "?" + createQueryString("filter", 'C101'))
        console.log(values)
    }

    return (
        <Card x-chunk="dashboard-07-chunk-0" className=" shadow-none rounded-none">
            <CardHeader>
                {/* <CardTitle>Product Details</CardTitle> */}
                <CardDescription>
                    上次稽核時間:<span> {audit_details.length ? audit_details[0].create_date : '尚未有稽核紀錄'}</span>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="auditName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>稽核人員</FormLabel>
                                    <FormControl>
                                        <Input className="text-base" placeholder={audit_details.length ? audit_details[0].emp_name : ''} {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display name.
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
                                        <Input className="text-base" placeholder={audit_details.length ? audit_details[0].real_people : ''} {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display name.
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
                                        <Textarea placeholder={audit_details.length ? audit_details[0].auditRemark : ''} {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="auditTime"
                            render={({ field }) => (
                                <FormItem className='hidden'>
                                    <FormLabel>備註</FormLabel>
                                    <FormControl>
                                        <Input className="text-base" placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isAudit"
                            render={({ field }) => (
                                <FormItem className='hidden'>
                                    <FormLabel>備註</FormLabel>
                                    <FormControl>
                                        <Checkbox checked={field.value} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">稽核</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}