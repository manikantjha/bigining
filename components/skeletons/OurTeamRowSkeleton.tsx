import ContainerWrapper from "../common/ContainerWrapper";

export default function OurTeamRowSkeleton() {
  return (
    <ContainerWrapper containerClassName="bg-gray-50">
      <div className="text-center mb-16">
        <div className="text-3xl md:text-4xl mb-4">
          <div className="h-[2.25rem] bg-gray-200 rounded-full w-[50%] lg:w-[25%] mx-auto"></div>
        </div>
      </div>
      <div className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[...Array(5)].map((item: any, index) => (
          <div
            key={index}
            className="shadow-sm-light rounded-lg overflow-hidden flex flex-col items-center p-8 border bg-white"
          >
            <div className="w-[75px] h-[75px] md:w-[150px] md:h-[150px] overflow-hidden rounded-full">
              <div className="flex items-center justify-center w-full h-full bg-gray-300 rounded object-cover">
                <svg
                  className="w-10 h-10 text-gray-200 dark:text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
              </div>
            </div>
            <div className="h-[1rem] bg-gray-200 rounded-full w-[85%] mb-2 mt-4 mx-auto"></div>
            <div className="h-[1rem] bg-gray-200 rounded-full w-[85%] mb-2 mx-auto"></div>
          </div>
        ))}
      </div>
    </ContainerWrapper>
  );
}
