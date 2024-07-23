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
import { Check, Router, X } from "lucide-react";
import { login } from "@/app/actions/audit-api";
import { useRouter } from "next/navigation";
import { serialize } from 'cookie'
import { NextResponse } from "next/server";
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
const formSchema = z.object({
    account: z.string().min(2, {
        message: "使用者帳號需長度至少為2",
    }),
    password: z.string().min(2, {
        message: "使用者密碼需長度至少為2",
    }),
})

export default function AuditLoginForm() {
    const [isLogin, setIsLogin] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [register_res, setRegister_res] = useState([])

    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            account: "",
            password: "",
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
                return { 'title': '報到失敗', 'description': '報到失敗，請再次檢查輸入資料是否有誤。如有任何疑問，請隨時聯繫我們的工作人員。我們感謝您的理解與配合！', 'icon': <X className="" color="red" ></X> }
            }
        }
    }
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const req = [
            {
                "emID": values.account,
                "emPwd": values.password
            }
        ]
        const res = await login(req)


        if (res) {
            deleteCookie('username');
            deleteCookie('id');
            setCookie('username', res[0].emName);
            setCookie('id', res[0].eser);
            // setCookie('ID', res[0].eser);
            router.push('/dashboard');
        } else {
            setShowAlert(true)

        }


    }
    return (
        <Card className="mx-auto w-full border-none">
            <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
                <AlertDialogContent >
                    <AlertDialogHeader>
                        <AlertDialogTitle className="justify-center items-center flex flex-col">
                            <X className="" color="red" />
                            登入失敗
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            請重新輸入正確的用戶名和密碼
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
                            name="account"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold text-md">帳號</FormLabel>
                                    <FormControl>
                                        <Input className="text-base" placeholder="你的帳號" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold text-md">密碼</FormLabel>
                                    <FormControl>
                                        <Input className="text-base" type="password" placeholder="你的密碼" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">登入</Button>
                    </form>
                </Form>
                {/* <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="#" className="underline">
                        Sign up
                    </Link>
                </div> */}
            </CardContent>
        </Card>
    );
}
