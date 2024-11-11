import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <section className="bg-white">
      <div className="lg:grid min-h-screen lg:grid-cols-12">
        <aside className="relative sm:block hidden lg:order-last lg:col-span-5 lg:h-full xl:col-span-6  ">
          <Image
            alt="side image"
            src="https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <SignUp />
        </main>
      </div>
    </section>
  );
}
