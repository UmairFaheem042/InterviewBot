"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const Header = () => {
  const currentTab = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="bg-white border-b">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link href="/dashboard" className="block text-teal-600">
              <Image src="/logo.svg" alt="Logo404" className="w-[50px]" />
            </Link>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link
                    className={`${
                      currentTab.startsWith("/dashboard")
                        ? "text-pink-500 font-bold"
                        : "text-gray-500 hover:text-gray-500/75"
                    } transition `}
                    href="/dashboard"
                  >
                    Dashboard
                  </Link>
                </li>

                <li>
                  <Link
                    className={`${
                      currentTab.startsWith("/about")
                        ? "text-pink-500 font-bold"
                        : "text-gray-500 hover:text-gray-500/75"
                    } transition `}
                    href="/about"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              <UserButton />

              {/* toggle button */}
              <div className="block md:hidden z-10">
                <button
                  className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                  onClick={() => setIsOpen((prev) => !prev)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>

              {/* mobile nav */}
              <nav
                aria-label="Global"
                className={`${
                  isOpen ? "translate-x-[0]" : "translate-x-[110%]"
                } absolute md:hidden  bg-white top-0 right-0 transition-all`}
                // fix this: when isOpen true and i change width the sidebar disappears but when i go to smaller screen size it is already open.
              >
                <ul className="flex flex-col h-screen w-[80vw] border justify-center items-center gap-6 text-lg">
                  <li>
                    <Link
                      className={`${
                        // currentTab === "/dashboard"
                        currentTab.startsWith("/dashboard")
                          ? "text-pink-500 font-bold"
                          : "text-gray-500 hover:text-gray-500/75"
                      } transition `}
                      href="/dashboard"
                    >
                      Dashboard
                    </Link>
                  </li>

                  <li>
                    <Link
                      className={`${
                        // currentTab === "/upgrade"
                        currentTab.startsWith("/about")
                          ? "text-pink-500 font-bold"
                          : "text-gray-500 hover:text-gray-500/75"
                      } transition `}
                      href="/about"
                    >
                      About Us
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
