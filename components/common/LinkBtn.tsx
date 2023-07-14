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
          ? "bg-bgLight hover:bg-black text-black hover:text-textLight"
          : "bg-bgDark hover:bg-black text-textLight hover:text-textLight"
      } rounded-full !w-[200px] hover:shadow-sm`}
    >
      {props.text || "See All"}
    </Link>
  );
}
