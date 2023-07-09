import Link from "next/link";
import React, { ReactNode } from "react";

interface ISidebarMenuItem {
  objMenuItem: {
    icon: ReactNode;
    name: string;
    path: string;
  };
}

export default function SidebarMenuItem(props: ISidebarMenuItem) {
  return (
    <div>
      <li>
        <Link
          href={props.objMenuItem.path}
          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {props.objMenuItem.icon}
          <span className="ml-3">{props.objMenuItem.name}</span>
        </Link>
      </li>
    </div>
  );
}
