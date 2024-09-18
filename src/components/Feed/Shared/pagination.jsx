import { FaLessThan,FaGreaterThan  } from "react-icons/fa";

const Pagination = ({
    handlePreviousPage,
    handleNextPage,
    totalPage,
    page
}) => {
    return(
        <div
            className="text-gray-400 flex justify-center items-center m-8 text-sm"
        >
            <div
                onClick={handlePreviousPage}
                className="mr-2 rounded shadow p-2"
            >
             <FaLessThan />
            </div>
            <div
                className="ml-1 text-gray-500"
            >
                {page}
            </div>
            <div
                className=" ml-1 text-md text-gray-500"
            >
                {`out of ${totalPage} page/s`}
            </div>
            <div
                className="ml-2 rounded shadow p-2"
                onClick={handleNextPage}
            >
             <FaGreaterThan />
            </div>
        </div>
    );
}

export default Pagination;