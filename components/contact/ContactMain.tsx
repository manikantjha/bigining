import { getContactInfo, getServicesList } from "@/services/apiServices";
import { IRowTheme } from "@/types/row";
import { useQuery } from "react-query";
import RenderAppropriateComponent from "../admin/common/RenderAppropriateComponent";
import Error from "../common/Error";
import Loading from "../common/Loading";
import RowWrapper from "../common/RowWrapper";
import ContactForm from "./ContactForm";
import ContactInfoCard from "./ContactInfoCard";

interface IContactMain extends IRowTheme {
  containerClassName?: string;
}

export default function ContactMain(props: IContactMain) {
  const contactInfos = useQuery("contactInfos", () => getContactInfo());
  const lstServices = useQuery("lstServices", () => getServicesList());
  return (
    <RowWrapper
      theme={props.theme}
      containerWrapperClassName={props.containerClassName}
    >
      <div className="bg-bgDarkLight shadow p-4 lg:p-8 max-w-7xl rounded-lg grid xs:grid-cols-1 md:grid-cols-1 lg:grid-cols-[2fr_3fr] gap-4 mx-auto">
        <div className="grid grid-rows-[1fr_auto] rounded-xl p-6 border border-black bg-gradient-to-br from-primaryLight via-secondaryLight to-accentLight">
          <RenderAppropriateComponent
            queryResult={contactInfos}
            loadingComponent={<Loading containerSize="h-full w-full" />}
            errorComponent={
              <Error
                containerClassName="h-[200px] w-full overflow-hidden flex justify-center items-center"
                errorText="Failed to load contact info :("
              />
            }
          >
            <ContactInfoCard contactInfos={contactInfos} />
          </RenderAppropriateComponent>
        </div>
        <ContactForm lstServices={lstServices} />
      </div>
    </RowWrapper>
  );
}
