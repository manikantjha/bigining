import { lstNavBarMenu } from "@/data/data";
import { Dispatch, SetStateAction } from "react";
import NavbarMenuItem from "./NavbarMenuItem";
import { checkIsActive } from "./navbarHelper";

interface INavDrawerNavDrawer {
  routerPathName: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
}

export default function NavDrawer(props: INavDrawerNavDrawer) {
  return (
    <div
      className={`fixed top-[73] ${
        props.isOpen ? "left-0" : "left-[-100vw]"
      }  h-[calc(100vh_-_73px)] z-[1000] p-4 overflow-y-auto bg-bgLight w-full shadow-lg grid grid-rows-[auto_1fr] gap-4 transition-all lg:hidden`}
    >
      <button
        type="button"
        className="text-textLight bg-bgDark hover:bg- hover:text-gray-900 rounded-lg text-sm p-1.5 w-fit ml-auto inline-flex items-center"
        onClick={() => props.setIsOpen(false)}
      >
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">Close menu</span>
      </button>
      <ul className="flex flex-col p-4 border border-black rounded-lg space-y-4">
        {lstNavBarMenu.map((item) => (
          <NavbarMenuItem
            key={item.id}
            objMenuItem={item}
            isActive={checkIsActive(item.path, props.routerPathName)}
            onClick={() => props.setIsOpen(false)}
          />
        ))}
      </ul>
    </div>
  );
}
