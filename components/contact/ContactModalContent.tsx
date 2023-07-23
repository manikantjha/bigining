/* eslint-disable @next/next/no-img-element */

import { ReactNode } from "react";

interface IContactModalContent {
  isSuccess: boolean;
  handleClose: () => void;
  message?: ReactNode;
}

function SuccessCase(props: IContactModalContent) {
  return (
    <div className="grid grid-rows-[auto_auto_auto] gap-4 place-items-center">
      <div className="text-center mb-8">
        <p className="text-3xl md:text-4xl mb-4">Success!</p>
        {props.message ? (
          props.message
        ) : (
          <p className="text-md md:text-lg text-black text-center">
            Thank you for reaching out to us.
            <br /> We will reply you soon!
          </p>
        )}
      </div>
      <img
        src="/assets/success.svg"
        alt="success"
        className="h-[175px] md:h-[300px] w-full"
      />
    </div>
  );
}

function FailureCase(props: IContactModalContent) {
  return (
    <div className="grid grid-rows-[auto_auto_auto] gap-4 place-items-center">
      <div className="text-center mb-8">
        <p className="text-3xl md:text-4xl mb-4">Oops!</p>
        {props.message ? (
          props.message
        ) : (
          <p className="text-md md:text-lg text-black text-center">
            Something went wrong, while sending message.
            <br /> Try again later.
          </p>
        )}
      </div>
      <img
        src="/assets/failure.svg"
        alt="success"
        className="h-[175px] md:h-[300px] w-full"
      />
    </div>
  );
}

export default function ContactModalContent(props: IContactModalContent) {
  return (
    <div className="p-6 space-y-6">
      {props.isSuccess ? (
        <SuccessCase {...props} />
      ) : (
        <FailureCase {...props} />
      )}
    </div>
  );
}
