import { IRowTheme } from "@/types/row";
import Link from "next/link";

interface ISeeAllBtn extends IRowTheme {
  href: string;
  text?: string;
}

export default function LinkBtn(props: ISeeAllBtn) {
  return (
    <Link
      href={props.href}
      className={`block mx-auto text-center p-3 font-bold ${
        props.theme === "dark"
          ? "bg-accentLighter hover:bg-black text-black hover:text-accentLighter"
          : "bg-primaryDark hover:bg-black text-accentLighter hover:text-accentLighter"
      } rounded-full !w-[200px] hover:shadow-sm`}
    >
      {props.text || "See All"}
    </Link>
  );
}
