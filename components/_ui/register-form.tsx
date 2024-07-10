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
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

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

export default function RegisterForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            registerName: "",
            rigisterIDNumber: "",
            venueCode: "",
            venuePeriod: ""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {

        console.log(values)
    }
    return (
        <Card className="mx-auto w-full border-none">
            <CardHeader></CardHeader>
            <CardContent>
                {/* <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              className="text-base"
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              required
              className="text-base"
            />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="#" className="underline">
            Sign up
          </Link>
        </div> */}
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
