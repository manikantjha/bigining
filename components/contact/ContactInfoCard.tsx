import { UseQueryResult } from "react-query";
import ContactInfoListItem from "./ContactInfoListItem";

interface IContactInfoCardProps {
  contactInfos: UseQueryResult<any, unknown>;
}

export default function ContactInfoCard(props: IContactInfoCardProps) {
  const contactInfo = props.contactInfos?.data
    ? props.contactInfos?.data
    : undefined;

  if (!contactInfo) return null;
  return (
    <>
      <div className="mb-6 lg:mb-0">
        <h2 className="text-4xl text-black mb-4 font-display uppercase">
          {contactInfo.title}
        </h2>
        {contactInfo.description && (
          <p className="text-base md:text-lg font-semibold text-black">
            {contactInfo.description}
          </p>
        )}
      </div>
      <div className="text-base text-black font-medium">
        <ContactInfoListItem icon="email" info={contactInfo.email} />
        <ContactInfoListItem icon="phone" info={`+91 ${contactInfo.phone1}`} />
        {contactInfo.phone2 && (
          <ContactInfoListItem
            info={`+91 ${contactInfo.phone2}`}
            icon="phone"
          />
        )}
        <ContactInfoListItem icon="location" info={contactInfo.address} />
      </div>
    </>
  );
}
