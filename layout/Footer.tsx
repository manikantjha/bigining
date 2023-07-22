import SocialMediaIcons from "@/components/common/SocialMediaIcons";
import { companyName } from "@/data/data";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black shadow border-t border-t-accentLighter">
      <div className="w-full mx-auto container md:py-6 py-4 px-5 md:px-0 md:flex md:items-center  justify-center md:justify-between">
        <div className="flex flex-wrap items-center md:justify-normal justify-center">
          <span className="text-sm text-white sm:text-center">
            © 2023{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              {companyName}™
            </a>{" "}
            All Rights Reserved
          </span>
        </div>
        <ul className="flex flex-wrap items-center md:justify-normal justify-center mt-3 text-sm text-white space-x-4 md:space-x-6">
          <li>
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </li>
          <li>
            <SocialMediaIcons />
          </li>
        </ul>
      </div>
    </footer>
  );
}
