import { NextResponse } from 'next/server';
import { parse } from 'cookie';
import { getCookie, hasCookie } from 'cookies-next';
import { cookies } from 'next/headers';
export async function middleware(req) {


    const url = req.nextUrl.clone();
    console.log('觸發')
    if (hasCookie('username', { cookies })) {
        const username = getCookie('username', { cookies });
        try {
            if (username) {
                // 会话存在且有效，允许请求通过
                return NextResponse.next();
            }
        } catch (error) {
            // 解析会话失败，可能是篡改的 cookie，继续执行重定向
        }
    }

    url.pathname = '/audit/login';
    return NextResponse.redirect(url);
}

export const config = {
    matcher: ['/dashboard/:path*'], // 保护的路径
};
