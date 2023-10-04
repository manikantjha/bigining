import React from "react";
import CommonLinkButton from "../admin/common/CommonLinkButton";

interface PaginationNewProps {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  containerClassName?: string;
  baseHref: string;
  alwaysVisible?: boolean;
  scroll?: boolean;
}

const PaginationNew: React.FC<PaginationNewProps> = ({
  totalItems,
  currentPage,
  itemsPerPage,
  containerClassName = "",
  baseHref,
  alwaysVisible = false,
  scroll = true,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (!alwaysVisible && totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers.map((pageNumber) => (
      <CommonLinkButton
        key={pageNumber}
        href={`${baseHref}/${pageNumber}`}
        passHref
        variant="filled"
        color={pageNumber === currentPage ? "primary" : "gray"}
        scroll={scroll}
      >
        {pageNumber}
      </CommonLinkButton>
    ));
  };

  return (
    <div className={`flex justify-center mt-4 ${containerClassName}`}>
      <div className="flex space-x-2">
        <CommonLinkButton
          passHref
          disabled={currentPage === 1}
          color="primary"
          href={`${baseHref}/${currentPage - 1}`}
          scroll={scroll}
        >
          Prev
        </CommonLinkButton>
        {renderPageNumbers()}
        <CommonLinkButton
          disabled={currentPage >= totalPages}
          color="primary"
          passHref
          href={`${baseHref}/${currentPage + 1}`}
          scroll={scroll}
        >
          Next
        </CommonLinkButton>
      </div>
    </div>
  );
};

export default PaginationNew;
