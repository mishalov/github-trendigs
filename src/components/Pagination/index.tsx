import React from "react";
import Button from "../Button";
import { Link } from "react-router-dom";
import "./Pagination.scss";

interface IPaginationProps {
  pageNow: number;
}

const Pagination: React.FC<IPaginationProps> = ({ pageNow }) => (
  <div className="pagination">
    Page:
    <div className="pagination-item">
      <Link to={"/1"}>
        <Button status={pageNow === 1 || 0 ? "disabled" : "normal"}>1</Button>
      </Link>
    </div>
    <div className="pagination-item">
      {pageNow > 3 ? (
        <div className="pagination-item__placeholder"> ... </div>
      ) : (
        <Link to={"/2"}>
          <Button status={pageNow === 2 ? "disabled" : "normal"}>2</Button>
        </Link>
      )}
    </div>
    <div className="pagination-item">
      {pageNow > 3 ? (
        <Link to={`${pageNow - 1}`}>
          <Button>{pageNow - 1}</Button>
        </Link>
      ) : (
        <Link to={"/3"}>
          <Button status={pageNow === 3 ? "disabled" : "normal"}>3</Button>
        </Link>
      )}
    </div>
    <div className="pagination-item">
      {pageNow > 3 ? (
        <Link to={`${pageNow}`}>
          <Button status="disabled">{pageNow}</Button>
        </Link>
      ) : (
        <Link to={"/4"}>
          <Button status={"normal"}>4</Button>
        </Link>
      )}
    </div>
    <div className="pagination-item">
      {pageNow > 3 ? (
        <Link to={`${pageNow + 1}`}>
          <Button>{pageNow + 1}</Button>
        </Link>
      ) : (
        <Link to={"/5"}>
          <Button status={"normal"}>5</Button>
        </Link>
      )}
    </div>
  </div>
);

export default Pagination;
