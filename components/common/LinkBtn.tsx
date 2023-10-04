import { IRowTheme } from "@/types/row";
import Link from "next/link";

interface ISeeAllBtn extends IRowTheme {
  href: string;
  text?: string;
  className?: string;
}

export default function LinkBtn({
  href,
  text = "See All",
  theme,
  className = "",
}: ISeeAllBtn) {
  return (
    <Link
      href={href}
      className={`block mx-auto text-center p-3 font-bold ${
        theme === "dark"
          ? "bg-bgLight hover:bg-black text-black hover:text-textLight"
          : "bg-bgDark hover:bg-black text-textLight hover:text-textLight"
      } rounded-full !w-[200px] hover:shadow-sm ${className}`}
    >
      {text}
    </Link>
  );
}
