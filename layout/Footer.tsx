import SocialMediaIcons from "@/components/common/SocialMediaIcons";
import { companyName } from "@/data/data";
import Link from "next/link";
import DunsSealScript from "./DunsSealScript";

export default function Footer() {
  return (
    <footer className="bg-black shadow border-t border-t-accentLighter">
      <div className="w-full mx-auto container md:py-6 py-4 px-5 md:px-0 md:flex md:items-center  justify-center md:justify-between">
        <div className="flex flex-wrap items-center md:justify-normal justify-center">
          <span className="text-sm text-textLight sm:text-center">
            © {new Date()?.getFullYear()}{" "}
            <Link href="/" className="hover:underline">
              {companyName} Entertainment™
            </Link>{" "}
            All Rights Reserved 
          </span>
        </div>
        <div>  
          
          <iframe id='Iframe1' src='https://dunsregistered.dnb.com/SealAuthentication.aspx?Cid=1' width='114px' height='97px'  scrolling='no' allowTransparency={true} ></iframe>
 
              
              </div>
        <ul className="flex flex-wrap items-center md:justify-normal justify-center mt-3 text-sm text-textLight space-x-4 md:space-x-6">
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
