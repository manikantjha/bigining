import React from "react";
import CommonLinkButton from "../admin/common/CommonLinkButton";

interface PaginationProps {
  totalWorks: number;
  currentPage: number;
  worksPerPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalWorks,
  currentPage,
  worksPerPage,
}) => {
  const totalPages = Math.ceil(totalWorks / worksPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers.map((pageNumber) => (
      <CommonLinkButton
        key={pageNumber}
        href={`/admin/workNew?page=${pageNumber}`}
        passHref
        variant="filled"
        color={pageNumber === currentPage ? "primary" : "gray"}
      >
        {pageNumber}
      </CommonLinkButton>
    ));
  };

  return (
    <div className="flex justify-center mt-4">
      {totalPages > 1 && (
        <div className="flex space-x-2">
          <CommonLinkButton
            href={`/admin/workNew?page=${currentPage - 1}`}
            passHref
            disabled={currentPage === 1}
            color="primary"
          >
            Prev
          </CommonLinkButton>
          {renderPageNumbers()}
          <CommonLinkButton
            href={`/admin/workNew?page=${currentPage + 1}`}
            disabled={currentPage === totalPages}
            color="primary"
            passHref
          >
            Next
          </CommonLinkButton>
        </div>
      )}
    </div>
  );
};

export default Pagination;
