import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Nav from "./Nav";


export default function Home() {
    const [students, setStudents] = useState([])
    const [currentPage, setCurrentPage] = useState(0);
    const [isFirstPage, setIsFirstPage] = useState(true);
    const [isLastPage, setIsLastPage] = useState(false);
    const [totalPage, setTotalPage] = useState(0);

    const getStudents = (page) => {
        axios.get(`http://localhost:8080/api/students?page=${page}`)
            .then(response => {
                setStudents(response.data.content);
                setIsFirstPage(response.data.first);
                setIsLastPage(response.data.last);
                setTotalPage(response.data.totalPages);
            })
            .catch(error => {
                console.error("Error fetching students:", error);
            });
    };

    useEffect(() => {
        getStudents(currentPage);
    }, [currentPage]);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    return (
        <div>
            <Nav/>
            <hr/>
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
                {students.map(student =>
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
            <div style={{textAlign: "center"}}>
                {isLastPage && <button onClick={handlePrevPage} className={"btn btn-primary"}>Previous</button>}
                {isFirstPage && <button onClick={handleNextPage} className={"btn btn-primary"}>Next</button>}
                <div>
                    {currentPage + 1 + ` | ` + totalPage}
                </div>
            </div>
        </div>
    )
}