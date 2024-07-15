'use client'

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { register } from "@/app/actions/register-api";
import { useState } from "react";
import { Check } from "lucide-react";

const formSchema = z.object({
    registerName: z.string().min(2, {
        message: "使用者名稱需至少須為2個字",
    }),
    rigisterIDNumber: z.string().min(2, {
        message: "身分證末四碼必須為四位數字",
    }),
    venueCode: z.string(),
    venuePeriod: z.string(),
})

export default function RegisterForm(props: { venueDatas: any }) {
    const [showAlert, setShowAlert] = useState(false)
    const { venueDatas } = props
    const [register_res, setRegister_res] = useState([])
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            registerName: "",
            rigisterIDNumber: "",
            venueCode: "",
            venuePeriod: ""
        },
    })
    function getRegisterStatus(data: any) {
        //回傳 '已報到' '報到成功' '報到失敗'
        if (data.result) {
            return { 'title': '報到成功', 'description': '您已經報到成功。如有任何疑問，請隨時聯繫我們的工作人員。我們感謝您的理解與配合！', 'icon': <Check className="" color="green" ></Check> }
        } else {
            if (data.msg === '已報到過，請勿在報到') {
                return { 'title': '已報到過，請勿在報到', 'description': '您已經報到成功。如有任何疑問，請隨時聯繫我們的工作人員。我們感謝您的理解與配合！', 'icon': <Check className="" color="green" ></Check> }
            } else {
                return { 'title': '報到失敗', 'description': '您已經報到成功。如有任何疑問，請隨時聯繫我們的工作人員。我們感謝您的理解與配合！', 'icon': <Check className="" color="green" ></Check> }
            }
        }
    }
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // data = [
        //     {
        //         "placeused_serno": "30169",
        //         "place_serno": "7",
        //         "placeno": "C101",
        //         "placename": "101教室",
        //         "use_date": "2024-07-26",
        //         "ck_person": "王小明",
        //         "ck_id": "9999"
        //     }
        // ]
        const req = [
            {
                "placeused_serno": venueDatas[0].placeused_serno,
                "place_serno": venueDatas[0].place_serno,
                "placeno": venueDatas[0].placeno,
                "placename": venueDatas[0].placename,
                "use_date": venueDatas[0].use_date,
                "ck_person": values.registerName,
                "ck_id": values.rigisterIDNumber
            }
        ]

        const res = await register('raxcruz', req)
        setRegister_res(res)
        setShowAlert(true)
        console.log(res)
    }
    return (
        <Card className="mx-auto w-full border-none">
            <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
                <AlertDialogContent >
                    <AlertDialogHeader className="bg-red-300">
                        <AlertDialogTitle className="justify-center items-center flex flex-col">{getRegisterStatus(register_res).icon}{getRegisterStatus(register_res).title}</AlertDialogTitle>
                        <AlertDialogDescription>
                            您已經報到成功。如有任何疑問，請隨時聯繫我們的工作人員。我們感謝您的理解與配合！
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction>確認</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <CardHeader></CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="registerName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold text-md">姓名</FormLabel>
                                    <FormControl>
                                        <Input className="text-base" placeholder="shadcn" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="rigisterIDNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold text-md">身分證後四碼</FormLabel>
                                    <FormControl>
                                        <Input className="text-base" placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="venueCode"
                            render={({ field }) => (
                                <FormItem className="hidden">
                                    <FormLabel className="font-bold text-md">身分證後四碼</FormLabel>
                                    <FormControl>
                                        <Input className="text-base" placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="venuePeriod"
                            render={({ field }) => (
                                <FormItem className="hidden">
                                    <FormLabel className="font-bold text-md">身分證後四碼</FormLabel>
                                    <FormControl>
                                        <Input placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">報到</Button>
                    </form>
                </Form>
                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="#" className="underline">
                        Sign up
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
