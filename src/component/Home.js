import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useLocation} from "react-router-dom";
import Nav from "./Nav";
import ReactPaginate from "react-paginate";

export default function Home() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const addressId = +searchParams.get("addressId");
    const [students, setStudents] = useState([]);
    const itemsPerPage = 10; // Số phần tử hiển thị trên mỗi trang
    const [currentPage, setCurrentPage] = useState(0);

    if (addressId === 0) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            getStudents();
        }, [currentPage]);
    } else {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            searchStudentsByAddress(addressId);
        }, [addressId]);
    }

    const getStudents = () => {
        axios
            .get(`http://localhost:8080/api/students`)
            .then((response) => {
                setStudents(response.data);
            })
            .catch((error) => {
                console.error("Error fetching students:", error);
            });
    };
    const searchStudentsByAddress = (addressId) => {
        axios
            .get(`http://localhost:8080/api/students/search-by-address/${addressId}`)
            .then((response) => {
                setStudents(response.data);
            })
            .catch((error) => {
                console.error("Error fetching students:", error);
            });
    };


    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };


    const totalPages = Math.ceil(students.length / itemsPerPage);

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentPageData = students.slice(startIndex, endIndex);


    return (
        <div>
            <Nav/>
            <hr/>
            {students.length === 0 ? <h1 style={{textAlign:"center"}} className={"text-danger"}>Not have any student</h1> :
                <table className={"table table-hover"} style={{textAlign: "center"}}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentPageData.map(student =>
                        <tr>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                            <td>{student.gender}</td>
                            <td>{student.address.name}</td>
                            <td>{student.email}</td>
                            <td><Link to={`/view/${student.id}`} className={"btn btn-success"}>Detail</Link></td>
                        </tr>
                    )}
                    </tbody>
                </table>
            }
            <div>
                <ReactPaginate
                    previousLabel={currentPage === 0 ? '' : 'Previous'}
                    nextLabel={currentPage === totalPages - 1 ? '' : 'Next'}
                    breakLabel={'...'}
                    pageCount={totalPages}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    pageClassName={'custom-page'}
                    activeClassName={'active'}
                />
            </div>

        </div>
    )
}