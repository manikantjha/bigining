import React from "react";
import ContainerWrapper from "../common/ContainerWrapper";

export default function PackagesRowSkeleton() {
  return (
    <ContainerWrapper containerClassName="animate-pulse">
      <div className="text-center mb-16 ">
        <div className="text-3xl md:text-4xl mb-4">
          <div className="h-[2.25rem] bg-gray-200 rounded-full w-[50%] lg:w-[25%] mx-auto"></div>
        </div>
      </div>
      <div className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
        {[...Array(3)].map((item, index) => (
          <div
            key={index}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg shadow-sm-light overflow-hidden"
          >
            <div className="bg-white text-center">
              <div className="p-4 lg:p-6 bg-gray-300">
                <p className="text-2xl font-semibold text-white"></p>
              </div>
              <hr />
              <div className="px-4 lg:px-6 py-4">
                <div className="flex items-baseline justify-center">
                  <span className="text-3xl font-semibold">&#8377;</span>
                  <span className="text-5xl font-semibold tracking-tight"></span>
                </div>
                <div className="h-[1rem] bg-gray-200 rounded-full dark:bg-gray-700 w-[85%] mt-2 mx-auto"></div>
              </div>
            </div>
            <hr />
            <div className="p-4 lg:p-6">
              <ul role="list" className="space-y-4">
                {[...Array(4)].map((item, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <svg
                      aria-hidden="true"
                      className="flex-shrink-0 w-5 h-5 text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Check icon</title>
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <div className="h-[1rem] bg-gray-200 rounded-full dark:bg-gray-700 w-[85%] mx-auto"></div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </ContainerWrapper>
  );
}
