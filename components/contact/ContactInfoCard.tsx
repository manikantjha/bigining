import { UseQueryResult } from "react-query";
import ContactInfoListItem from "./ContactInfoListItem";

interface IContactInfoCardProps {
  contactInfos: UseQueryResult<any, unknown>;
}

export default function ContactInfoCard(props: IContactInfoCardProps) {
  return (
    <>
      <div className="mb-6 lg:mb-0">
        <h2 className="text-4xl text-black mb-4 font-display uppercase">
          {props.contactInfos?.data?.contactInfos &&
            props.contactInfos?.data?.contactInfos[0]?.title}
        </h2>
        <p className="text-base md:text-lg font-semibold text-black">
          {props.contactInfos?.data?.contactInfos &&
            props.contactInfos?.data?.contactInfos[0]?.description}
        </p>
      </div>
      <div className="text-base text-black font-medium">
        <ContactInfoListItem
          objContactInfo={{
            icon: (
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="w-4 h-4 mr-2 shrink-0"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M17.834 6.166a8.25 8.25 0 100 11.668.75.75 0 011.06 1.06c-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788 3.807-3.808 9.98-3.808 13.788 0A9.722 9.722 0 0121.75 12c0 .975-.296 1.887-.809 2.571-.514.685-1.28 1.179-2.191 1.179-.904 0-1.666-.487-2.18-1.164a5.25 5.25 0 11-.82-6.26V8.25a.75.75 0 011.5 0V12c0 .682.208 1.27.509 1.671.3.401.659.579.991.579.332 0 .69-.178.991-.579.3-.4.509-.99.509-1.671a8.222 8.222 0 00-2.416-5.834zM15.75 12a3.75 3.75 0 10-7.5 0 3.75 3.75 0 007.5 0z"
                />
              </svg>
            ),
            info:
              props.contactInfos?.data?.contactInfos &&
              props.contactInfos?.data?.contactInfos[0]?.email,
          }}
        />
        <ContactInfoListItem
          objContactInfo={{
            icon: (
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="w-4 h-4 mr-2 shrink-0"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                />
              </svg>
            ),
            info:
              props.contactInfos?.data?.contactInfos &&
              `+91 ${props.contactInfos?.data?.contactInfos[0]?.phone1}`,
          }}
        />
        {/* <ContactInfoListItem
          objContactInfo={{
            icon: (
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="w-4 h-4 mr-2 shrink-0"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                />
              </svg>
            ),
            info:
              props.contactInfos?.data?.contactInfos &&
              props.contactInfos?.data?.contactInfos[0]?.phone2,
          }}
        /> */}
        <ContactInfoListItem
          objContactInfo={{
            icon: (
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="w-4 h-4 mr-2 shrink-0"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                />
              </svg>
            ),
            info:
              props.contactInfos?.data?.contactInfos &&
              props.contactInfos?.data?.contactInfos[0]?.address,
          }}
        />
      </div>
    </>
  );
}
