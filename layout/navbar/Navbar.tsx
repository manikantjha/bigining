/* eslint-disable @next/next/no-img-element */
import Logo from "@/components/common/Logo";
import { lstNavBarMenu } from "@/data/data";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import NavDrawer from "./NavDrawer";
import NavbarMenuItem from "./NavbarMenuItem";
import { checkIsActive } from "./navbarHelper";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <nav className="bg-bgDark px-4 py-4 shadow-md sticky top-0 left-0 right-0 z-[1000] border-b border-borderLight">
        <div className="container grid grid-cols-[1fr_auto] lg:grid-cols-[1fr_1fr_1fr] items-center mx-auto">
          <div className="hidden w-full lg:flex lg:w-full justify-end">
            <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg lg:flex-row lg:space-x-8 lg:mt-0 lg:text-sm lg:font-medium lg:border-0">
              {lstNavBarMenu.slice(0, 4).map((item) => (
                <NavbarMenuItem
                  key={item.id}
                  objMenuItem={item}
                  isActive={checkIsActive(item.path, router.pathname)}
                  onClick={() => setIsOpen(false)}
                />
              ))}
            </ul>
          </div>
          <div className="flex items-center lg:justify-center w-full">
            <Link href="/" className="flex items-center">
              <Logo isWhite />
            </Link>
          </div>
          <div className="hidden w-full lg:block lg:w-auto">
            <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg lg:flex-row lg:space-x-8 lg:mt-0 lg:text-sm lg:font-medium lg:border-0">
              {lstNavBarMenu.slice(4).map((item) => (
                <NavbarMenuItem
                  key={item.id}
                  objMenuItem={item}
                  isActive={checkIsActive(item.path, router.pathname)}
                  onClick={() => setIsOpen(false)}
                />
              ))}
            </ul>
          </div>
          <button
            type="button"
            className="inline-flex items-center ml-3 text-sm text-textLight rounded-lg lg:hidden hover:bg-bgLight hover:text-textDark focus:outline-none focus:ring-2 focus:ring-gray-200"
            onClick={() => setIsOpen((open) => !open)}
            title="menu"
          >
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </nav>
      <NavDrawer
        setIsOpen={setIsOpen}
        routerPathName={router.pathname}
        isOpen={isOpen}
      />
    </>
  );
}
