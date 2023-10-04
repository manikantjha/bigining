import { GetIcon, IIconProps } from "../common/icons/icons";

interface IContactInfoListItem {
  icon: IIconProps["name"];
  info: string;
}

export default function ContactInfoListItem({
  icon,
  info,
}: IContactInfoListItem) {
  return (
    <p className="flex items-center">
      <GetIcon
        fill="currentColor"
        strokeWidth={0}
        name={icon}
        size="w-5 h-5 mr-1"
      />
      {info}
    </p>
  );
}
