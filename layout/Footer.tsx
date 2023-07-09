import { companyName } from "@/data/data";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black shadow border-t border-t-accentLighter">
      <div className="w-full mx-auto container md:py-6 py-4 px-5 md:px-0 md:flex md:items-center md:justify-between">
        <span className="text-sm text-white sm:text-center">
          © 2023{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            {companyName}™
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm text-white">
          <li>
            <Link href="/privacy" className="mr-4 hover:underline md:mr-6">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
