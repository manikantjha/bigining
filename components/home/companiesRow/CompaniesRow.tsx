import RowWrapper from "@/components/common/RowWrapper";
import { ICompany } from "@/types/company";
import { IRowTheme } from "@/types/row";
import Slider, { CustomArrowProps } from "react-slick";
import CompanyCard from "./CompanyCard";

interface ICompaniesRowProps extends IRowTheme {
  companies: ICompany[];
}

function SampleNextArrow(props: CustomArrowProps) {
  const { className, style, onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute top-[50%] right-[-10px] translate-y-[-50%] cursor-pointer bg-black/50 rounded-full p-2 text-white z-10"
      title="next slide"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
        />
      </svg>
    </button>
  );
}

function SamplePrevArrow(props: CustomArrowProps) {
  const { className, style, onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute top-[50%] left-[-10px] translate-y-[-50%] cursor-pointer bg-black/50 rounded-full p-2 text-white z-10"
      title="previous slide"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
        />
      </svg>
    </button>
  );
}

export default function CompaniesRow(props: ICompaniesRowProps) {
  const companies = props.companies || [];

  if (!props?.companies.length) return null;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: companies.length > 4 ? 4 : companies.length,
    slidesToScroll: companies.length > 4 ? 4 : companies.length,
    initialSlide: 0,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: companies.length > 3 ? 3 : companies.length,
          slidesToScroll: companies.length > 3 ? 3 : companies.length,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: companies.length > 2 ? 2 : companies.length,
          slidesToScroll: companies.length > 2 ? 2 : companies.length,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <RowWrapper title="Our Clients" theme={props.theme}>
      <Slider {...settings}>
        {companies.map((item: ICompany, index: number) => (
          <div key={index} className="px-2">
            <CompanyCard company={item} theme={props.theme} />
          </div>
        ))}
      </Slider>
    </RowWrapper>
  );
}
