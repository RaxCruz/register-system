import Image from "next/image";



export default function Home() {
  return (
    <section className="bg-white dark:bg-gray-900 h-screen flex justify-center items-center">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center flex flex-col justify-center items-center gap-4">
          <Image src="/logo.png" width={267} height={112} alt="logo"></Image>
          <div>
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">歡迎使用報到系統</p>

          </div>
        </div>
      </div>
    </section>
  )
}