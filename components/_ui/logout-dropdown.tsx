'use client'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { getCookie, deleteCookie } from "cookies-next"

export default function LogoutDropdown({ username }: { username: any }) {
    const router = useRouter()
    const handleOnClick = () => {

        deleteCookie('username')
        deleteCookie('id')
        window.location.replace('/audit/login');
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="overflow-hidden rounded-full h-8 w-8"
                >
                    <Image
                        src="/placeholder-user.jpg"
                        width={36}
                        height={36}
                        alt="Avatar"
                        className="overflow-hidden rounded-full"
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>我的帳戶</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>{username}</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="bg-red-400 text-white" onClick={handleOnClick}>
                    登出
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}