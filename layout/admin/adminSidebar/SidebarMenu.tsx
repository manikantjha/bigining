import { lstAdminNavBarMenu } from "@/data/adminData";
import { signout } from "@/services/apiServices";
import SidebarMenuItem from "./SidebarMenuItem";

interface ISidebarMenuProps {
  isSidebarOpen: boolean;
}

export default function SidebarMenu(props: ISidebarMenuProps) {
  return (
    <aside
      id="default-sidebar"
      className={`fixed top-[88px] left-0 z-[100] w-full md:w-64 h-screen transition-transform ${
        props.isSidebarOpen
          ? "-translate-x-0 md:-translate-x-0"
          : "-translate-x-full md:-translate-x-0"
      }`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50">
        <ul className="space-y-2 font-medium">
          {lstAdminNavBarMenu.map((item) => (
            <SidebarMenuItem objMenuItem={item} key={item.id} />
          ))}

          <li
            onClick={async () => {
              await signout();
            }}
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
              />
            </svg>
            <span className="ml-3">Logout</span>
          </li>
        </ul>
      </div>
    </aside>
  );
}
