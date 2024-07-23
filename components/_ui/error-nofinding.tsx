import Image from "next/image";



export default function ErrorFinding() {
    return (
        <section className="bg-white dark:bg-gray-900 h-screen flex justify-center items-center">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center flex flex-col justify-center items-center gap-4">
                    <Image src="/logo.png" width={267} height={112} alt="logo"></Image>
                    <div>
                        <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">很抱歉,無法取得此場地編號的相關資料</p>
                        <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we are unable to retrieve information for this venue number.</p>

                    </div>
                </div>
            </div>
        </section>
    )
}