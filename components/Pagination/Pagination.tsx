import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";
interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (selectedPage: number) => void;
}

export default function Pagination({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      breakLabel="..."
      nextLabel="→"
      previousLabel="←"
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      onPageChange={(event) => {
        onPageChange(event.selected + 1);
      }}
    />
  );
}
