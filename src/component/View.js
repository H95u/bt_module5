import {useNavigate, useParams} from "react-router";
import axios from "axios";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";

export default function View() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState({
        name: "",
        address: {
            name: "",
        },
        avgPoint: 0,
        gender: "",
        email: "",
        img: ""
    });
    const deleteStudent = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8080/api/students/${id}`).then(() => {
                    navigate("/")
                })
                Swal.fire(
                    'Deleted!',
                    'Student has been deleted.',
                    'success'
                )
            }
        })
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/api/students/${id}`).then(res => {
            setStudent(res.data)
        })
    }, [id])


    const getAcademicPerformance = (avgPoint) => {
        if (avgPoint >= 8) {
            return "Loại Giỏi";
        } else if (avgPoint >= 6.5) {
            return "Loại Khá";
        } else if (avgPoint >= 4.0) {
            return "Loại TB";
        } else {
            return "Loại Yếu";
        }
    };

    return (
        <>
            <h1 style={{textAlign: "center"}}>Student detail</h1>
            <div style={{marginTop: "100px"}}>


                <table className="table" style={{margin: "auto", width: 700, textAlign: "center"}}>
                    <tbody>
                    <tr>
                        <th rowSpan={7}><img width={200} height={220} src={student.img} style={{borderRadius: "50%"}}/>
                        </th>
                        <th>Name</th>
                        <th>{student.name}</th>
                    </tr>
                    <tr>
                        <th>Address</th>
                        <th>{student.address.name}</th>
                    </tr>
                    <tr>
                        <th>Avg Point</th>
                        <th>{student.avgPoint}</th>
                    </tr>
                    <tr>
                        <th>Gender</th>
                        <th>{student.gender}</th>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <th>{student.email}</th>
                    </tr>
                    <tr>
                        <th>Academic performance</th>
                        <th>{getAcademicPerformance(student.avgPoint)}</th>
                    </tr>
                    <tr>

                    </tr>
                    <tr>
                        <th>
                            <Link to={"/"} className="btn btn-info">Back to home</Link>
                        </th>
                        <th><Link to={`/update/${student.id}`} className={"btn btn-secondary"}>Update</Link></th>
                        <th>
                            <button className={"btn btn-danger"} onClick={() => deleteStudent(student.id)}>Delete
                            </button>
                        </th>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}