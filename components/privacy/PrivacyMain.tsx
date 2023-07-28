import Link from "next/link";
import ContainerWrapper from "../common/ContainerWrapper";
import Title from "../common/Title";

export default function PrivacyMain() {
  return (
    <ContainerWrapper containerClassName="bg-bgLight min-h-[100vh]">
      <Title title="Privacy Policy" titleContainerClassName="text-textDark" />
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
        <p>Last updated: 23 July 2023</p>
        <p>{`Bigining operates the www.bigining.com website.`}</p>
        <p className="mt-4">
          This page informs you of our policies regarding the collection, use,
          and disclosure of Personal Information when you use our Service.
        </p>
        <p>
          We will not use or share your information with anyone except as
          described in this Privacy Policy.
        </p>
        <p>
          We use your Personal Information for providing and improving the
          Service. By using the Service, you agree to the collection and use of
          information in accordance with this policy.
        </p>
        <h3 className="text-xl font-bold mt-6">
          Information Collection and Use
        </h3>
        <p>
          {`While using our Service, we may ask you to provide us with certain
          personally identifiable information that can be used to contact or
          identify you. Personally identifiable information ("Personal
          Information") may include but is not limited to:`}
        </p>
        <ul className="list-disc list-inside mt-4">
          <li>Name</li>
          <li>Contact information, including email address and phone number</li>
          <li>
            Demographic information such as postal code, preferences, and
            interests
          </li>
          <li>Other information relevant to customer surveys and/or offers</li>
        </ul>
        <h3 className="text-xl font-bold mt-6">Log Data</h3>
        <p>
          {` We collect information that your browser sends whenever you visit our
          Service ("Log Data"). This Log Data may include information such as
          your computer's Internet Protocol ("IP") address, browser type,
          browser version, the pages of our Service that you visit, the time and
          date of your visit, the time spent on those pages, and other
          statistics.`}
        </p>
        <h3 className="text-xl font-bold mt-6">Cookies</h3>
        <p>
          {`Cookies are files with a small amount of data, which may include an
          anonymous unique identifier. Cookies are sent to your browser from a
          web site and stored on your computer's hard drive.`}
        </p>
        <p>
          {`We use "cookies" to collect information. You can instruct your browser
          to refuse all cookies or to indicate when a cookie is being sent.
          However, if you do not accept cookies, you may not be able to use some
          portions of our Service.`}
        </p>
        <h3 className="text-xl font-bold mt-6">Service Providers</h3>
        <p>
          We may employ third-party companies and individuals to facilitate our
          Service, to provide the Service on our behalf, to perform
          Service-related services, or to assist us in analyzing how our Service
          is used.
        </p>
        <p>
          These third parties have access to your Personal Information only to
          perform these tasks on our behalf and are obligated not to disclose or
          use it for any other purpose.
        </p>
        <h3 className="text-xl font-bold mt-6">Security</h3>
        <p>
          The security of your Personal Information is important to us, but
          remember that no method of transmission over the Internet, or method
          of electronic storage, is 100% secure. While we strive to use
          commercially acceptable means to protect your Personal Information, we
          cannot guarantee its absolute security.
        </p>
        <h3 className="text-xl font-bold mt-6">Links to Other Sites</h3>
        <p>
          {`Our Service may contain links to other sites that are not operated by
          us. If you click on a third-party link, you will be directed to that
          third party's site. We strongly advise you to review the Privacy
          Policy of every site you visit.`}
        </p>
        <p>
          We have no control over and assume no responsibility for the content,
          privacy policies, or practices of any third-party sites or services.
        </p>
        <h3 className="text-xl font-bold mt-6">{`Children's Privacy`}</h3>
        <p>
          {`Our Service does not address anyone under the age of 18 ("Children").`}
        </p>
        <p>
          We do not knowingly collect personally identifiable information from
          children under 18. If you are a parent or guardian and you are aware
          that your Children has provided us with Personal Information, please
          contact us. If we become aware that we have collected Personal
          Information from children under 18 without verification of parental
          consent, we take steps to remove that information from our servers.
        </p>
        <h3 className="text-xl font-bold mt-6">
          Changes to This Privacy Policy
        </h3>
        <p>
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by posting the new Privacy Policy on this page.
        </p>
        <p>
          You are advised to review this Privacy Policy periodically for any
          changes. Changes to this Privacy Policy are effective when they are
          posted on this page.
        </p>
        <h3 className="text-xl font-bold mt-6">Contact Us</h3>
        <p>
          If you have any questions about this Privacy Policy, please contact
          us:
        </p>
        <ul className="list-disc list-inside mt-4">
          <li>By email: </li>
          <li>
            By visiting this page on our website:{" "}
            <Link href={"/contact"} className="text=primaryLight underline">
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </ContainerWrapper>
  );
}
