import CommonButton from "@/components/admin/common/CommonButton";
import CommonLinkButton from "@/components/admin/common/CommonLinkButton";
import { GetIcon } from "@/components/common/icons/icons";
import Layout from "@/layout/Layout";
import { useRouter } from "next/router";
import React from "react";

function PaymentSuccess() {
  const { query } = useRouter();
  const { reference } = query;
  console.log("query", query);
  return (
    <Layout>
      <div className="w-full h-[calc(100vh-169px)] flex items-center justify-center p-4">
        <div className="text-center">
          <GetIcon
            name="check-circle"
            size={"w-20 h-20"}
            className="text-green-400 mx-auto mb-4"
          />
          <p className="text-4xl text-green-400 font-bold mb-4">
            Payment successful!
          </p>
          <p className="text-2xl font-semibold">
            Payment ID: <br /> {reference}
          </p>
          <p className="mt-20 text-xl">
            Please take a screenshot of this page before leaving!
          </p>
          <CommonLinkButton
            icon={<GetIcon name="back" />}
            className="mx-auto mt-8 w-fit"
            href="/"
          >
            Go Home
          </CommonLinkButton>
        </div>
      </div>
    </Layout>
  );
}

export default PaymentSuccess;
