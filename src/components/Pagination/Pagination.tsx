import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  page: number;
  onChangePage: (page: number) => void;
  perPage: number;
  search?: string;
  totalPages?: number;
}

export default function Pagination({
  page,
  onChangePage,
  totalPages = 1,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <ReactPaginate
      forcePage={page - 1}
      pageCount={totalPages}
      onPageChange={(selectedItem) => onChangePage(selectedItem.selected + 1)}
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  );
}
