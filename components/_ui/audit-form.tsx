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
    auditTime: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    isAudit: z.boolean(),
})

export default function AuditForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            auditName: "",
            auditNum: "",
            auditMemo: "",
            auditTime: "",
            isAudit: false,
        },
    })


    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }
    return (
        <Card x-chunk="dashboard-07-chunk-0" className=" shadow-none rounded-none border-2  border-red-400">
            <CardHeader>
                {/* <CardTitle>Product Details</CardTitle> */}
                <CardDescription>
                    上次稽核時間:<span> 2024-06-24 16:15:15</span>
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
                                        <Input className="text-base" placeholder="shadcn" {...field} />
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
                                        <Input className="text-base" placeholder="shadcn" {...field} />
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
                                        <Textarea placeholder="shadcn" {...field} />
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