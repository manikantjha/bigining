import React, { useState } from "react";
import CommonButton from "../CommonButton";
import { GetIcon } from "@/components/common/icons/icons";
import Pagination from "@/components/common/Pagination";

interface Column<T> {
  key: string;
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading: boolean;
  error: boolean;
  totalItems: number;
  currentPage?: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  baseHref: string;
}

const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  loading,
  error,
  totalItems,
  currentPage = 1,
  rowsPerPage,
  onPageChange,
  onEdit,
  onDelete,
  baseHref,
}: DataTableProps<T>) => {
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  //   const handleEdit = (row: any) => {
  //     console.log("Edit row:", row);
  //   };

  //   const handleDelete = (row: any) => {
  //     console.log("Delete row:", row);
  //   };

  return (
    <>
      {loading && <div>Loading...</div>}

      {!loading && !error && data.length > 0 && (
        <div className="w-full overflow-x-auto">
          <table className="w-full table-auto border-collapse text-left">
            <thead>
              <tr className="bg-gray-100 ">
                <th className="px-4 py-2">No.</th>
                {columns.map((column) => (
                  <th key={column.key} className="px-4 py-4">
                    {column.label}
                  </th>
                ))}
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={row._id || index} className="border-b">
                  <td className="px-4 py-2">{index + 1}</td>
                  {columns.map((column) => (
                    <td key={column.key} className="px-4 py-2">
                      {column.render ? column.render(row) : row[column.key]}
                    </td>
                  ))}
                  <td className="px-4 py-2 flex items-center justify-end space-x-4">
                    {onEdit && (
                      <CommonButton
                        onClick={() => onEdit(row)}
                        disabled={loading}
                        color="primary"
                        icon={<GetIcon name="edit" size="w-5 h-5" />}
                      />
                    )}
                    {onDelete && (
                      <CommonButton
                        onClick={() => onDelete(row)}
                        disabled={loading}
                        color="red"
                        icon={<GetIcon name="delete" size="w-5 h-5" />}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {error && <div>Error occurred while fetching data.</div>}

      {!loading && !error && data.length === 0 && <div>No data available.</div>}

      {!loading && !error && (
        <div className="mt-4 flex items-center justify-between">
          <span>
            Showing {data.length} of {totalItems} entries
          </span>
          <div className="flex items-center">
            {/* <button
              className={`mr-2 ${
                page === 0 ? "opacity-50 cursor-not-allowed" : "text-blue-600"
              }`}
              onClick={() => onPageChange(page - 1)}
              disabled={page === 0}
            >
              Previous
            </button>
            <button
              className={`ml-2 ${
                data.length < rowsPerPage
                  ? "opacity-50 cursor-not-allowed"
                  : "text-blue-600"
              }`}
              onClick={() => onPageChange(page + 1)}
              disabled={data.length < rowsPerPage}
            >
              Next
            </button> */}
            <Pagination
              currentPage={currentPage}
              totalItems={totalItems}
              itemsPerPage={10}
              containerClassName=""
              baseHref={baseHref}
              alwaysVisible
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DataTable;
