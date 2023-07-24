import {Link} from "react-router-dom";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router";

export default function Nav() {
    const [provinces, setProvinces] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/addresses`).then((response) => {
            setProvinces(response.data);
        })
    }, []);

    const searchByAddress = (addressId) => {
        navigate(`/?addressId=${addressId}`)
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-2">
                        <Link to="/create" className="btn btn-info">Add new student</Link>
                    </div>
                    <div className="col-lg-3">
                        <div>
                            <select className="form-select" onChange={(e) => searchByAddress(e.target.value)}>
                                <option value="">
                                    Select address
                                </option>
                                {provinces.map((item) => (
                                    <option value={item.id} key={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}