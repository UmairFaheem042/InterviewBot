import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <section className="bg-white">
      <div className="lg:grid min-h-screen lg:grid-cols-12">
        <aside className="relative sm:block hidden lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <Image
            alt="side image"
            src="/authImage.jpg"
            className="absolute inset-0 h-full w-full object-cover"
            fill
          />
        </aside>

        <main className="h-screen flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <SignIn />
        </main>
      </div>
    </section>
  );
}
