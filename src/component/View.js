import {useNavigate, useParams} from "react-router";
import axios from "axios";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

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

    useEffect(() => {
        axios.get(`http://localhost:8080/api/students/${id}`).then(res => {
            setStudent(res.data)
            console.log(res.data)
        })
    }, [id])

    const deleteStudent = (id) => {
        if (window.confirm("Are you sure ?")) {
            axios.delete(`http://localhost:8080/api/students/${id}`).then(() => {
                navigate("/");
            })
        }
    }

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
            <hr/>
            <table className="table" style={{margin: "auto", width: 600, textAlign: "center"}}>
                <tbody>
                <tr>
                    <th rowSpan={6}><img width={200} height={200} src={student.img}/></th>
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
                    <th><Link to={`/update/${student.id}`} className={"btn btn-secondary"}>Update</Link></th>
                    <th>
                        <button className={"btn btn-danger"} onClick={() => deleteStudent(student.id)}>Delete</button>
                    </th>
                </tr>
                <tr>
                    <th>
                        <Link to={"/"} className="btn btn-info">Back to home</Link>
                    </th>
                </tr>
                </tbody>
            </table>
        </>
    )
}