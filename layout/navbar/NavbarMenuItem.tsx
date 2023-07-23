import Link from "next/link";

interface INavbarMenuItem {
  objMenuItem: {
    name: string;
    path: string;
  };
  isActive?: boolean;
  onClick: () => void;
}

export default function NavbarMenuItem(props: INavbarMenuItem) {
  return (
    <li onClick={props.onClick}>
      <Link
        href={props.objMenuItem.path}
        className={`block py-2 pl-3 pr-4 rounded lg:bg-transparen lg:p-0 ${
          props.isActive
            ? "text-black lg:text-accentLight underline font-bold"
            : "text-black lg:text-accentLighter"
        } lg:hover:text-accentLight`}
        aria-current="page"
      >
        {props.objMenuItem.name}
      </Link>
    </li>
  );
}
