import ContainerWrapper from "../common/ContainerWrapper";

export default function ServicesRowSkeleton() {
  return (
    <ContainerWrapper containerClassName="bg-gray-100">
      <div className="text-center mb-16">
        <div className="text-3xl md:text-4xl mb-4">
          <div className="h-[2.25rem] bg-gray-200 rounded-full w-[50%] lg:w-[25%] mx-auto"></div>
        </div>
        <div className="text-lg">
          <div className="h-[1.125rem] bg-gray-200 rounded-full dark:bg-gray-700 w-[75%] lg:w-[50%] mb-2 mx-auto"></div>
        </div>
      </div>
      <div className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
        {[...Array(3)].map((item: any, index) => (
          <div key={index}>
            <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm-light overflow-hidden">
              <div className="">
                <div
                  className="bg-white rounded-lg"
                  id="about"
                  role="tabpanel"
                  aria-labelledby="about-tab"
                >
                  <div className="flex items-center space-x-4 px-5 md:px-6 py-4 md:py-6 bg-gray-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-10 h-10 fill-white"
                    >
                      <path d="M11.25 3v4.046a3 3 0 00-4.277 4.204H1.5v-6A2.25 2.25 0 013.75 3h7.5zM12.75 3v4.011a3 3 0 014.239 4.239H22.5v-6A2.25 2.25 0 0020.25 3h-7.5zM22.5 12.75h-8.983a4.125 4.125 0 004.108 3.75.75.75 0 010 1.5 5.623 5.623 0 01-4.875-2.817V21h7.5a2.25 2.25 0 002.25-2.25v-6zM11.25 21v-5.817A5.623 5.623 0 016.375 18a.75.75 0 010-1.5 4.126 4.126 0 004.108-3.75H1.5v6A2.25 2.25 0 003.75 21h7.5z" />
                      <path d="M11.085 10.354c.03.297.038.575.036.805a7.484 7.484 0 01-.805-.036c-.833-.084-1.677-.325-2.195-.843a1.5 1.5 0 012.122-2.12c.517.517.759 1.36.842 2.194zM12.877 10.354c-.03.297-.038.575-.036.805.23.002.508-.006.805-.036.833-.084 1.677-.325 2.195-.843A1.5 1.5 0 0013.72 8.16c-.518.518-.76 1.362-.843 2.194z" />
                    </svg>

                    <h2 className="text-2xl text-center font-semibold text-white"></h2>
                  </div>
                  <hr />
                  <div className="p-5 md:p-6">
                    <ul role="list" className="space-y-2">
                      {[...Array(4)].map((item, index) => (
                        <li key={index} className="">
                          <div className="flex space-x-2 items-center">
                            <svg
                              className="flex-shrink-0 w-4 h-4 text-gray-300 block"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                            <div className="h-[1rem] bg-gray-200 rounded-full dark:bg-gray-700 w-[85%] mx-auto"></div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-16">
        <div className="h-[48px] bg-gray-300 rounded-full dark:bg-gray-700 w-[200px] mx-auto"></div>
      </div>
    </ContainerWrapper>
  );
}
