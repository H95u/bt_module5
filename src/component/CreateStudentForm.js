import React, {useEffect, useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import axios from "axios";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../firebase";

const CreateStudentForm = () => {
    const [provinces, setProvinces] = useState([]);

    const initialValues = {
        name: "",
        age: "",
        address: "",
        avgPoint: "",
        gender: "",
        email: "",
        img: "",
    };


    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required").matches(/^[a-zA-Z]+$/, 'Name must contain only letters'),
        age: Yup.number().min(18, "Min age is 18").max(60, "Max age is 60").required("Age is required"),
        address: Yup.string().required("Address is required"),
        avgPoint: Yup.number().required("Avg Point is required").positive("Must be positive"),
        gender: Yup.string().required("Gender is required"),
        email: Yup.string().email("Invalid email address").required("Email is required"),
    });

    const getProvinces = () => {
        axios.get(`http://localhost:8080/api/addresses`).then((response) => {
            setProvinces(response.data);
        });
    };
    useEffect(getProvinces, []);

    const handleSubmit = async (values) => {

        values.address = {
            id: values.address
        };

        let file = document.getElementById("img").files[0]
        const storageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed",
            () => {
            },
            (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    values.img = downloadURL;
                    axios.post("http://localhost:8080/api/students", values);
                    alert("Student created successfully");
                });
            }
        );


    };

    return (
        <>
            <h1 style={{textAlign: "center"}}>Add new student</h1>
            <hr/>
            <div className={"form-create"}>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    <Form encType="multipart/form-data">
                        <div className="mb-3 row">
                            <label htmlFor="name" className="col-sm-2 col-form-label">
                                Name
                            </label>
                            <div className="col-sm-10">
                                <Field type="text" name="name" className="form-control"/>
                                <ErrorMessage name="name" component="div" className="text-danger"/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="age" className="col-sm-2 col-form-label">
                                Age
                            </label>
                            <div className="col-sm-10">
                                <Field type="number" name="age" className="form-control"/>
                                <ErrorMessage name="age" component="div" className="text-danger"/>
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label htmlFor="avgPoint" className="col-sm-2 col-form-label">
                                Avg
                            </label>
                            <div className="col-sm-10">
                                <Field type="number" name="avgPoint" className="form-control"/>
                                <ErrorMessage name="avgPoint" component="div" className="text-danger"/>
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label htmlFor="email" className="col-sm-2 col-form-label">
                                Email
                            </label>
                            <div className="col-sm-10">
                                <Field type="email" name="email" className="form-control"/>
                                <ErrorMessage name="email" component="div" className="text-danger"/>
                            </div>
                        </div>


                        <div className="mb-3 row">
                            <label htmlFor="gender" className="col-sm-2 col-form-label">
                                Gender
                            </label>
                            <div className="col-sm-10">
                                <Field as="select" name="gender" className="form-select"
                                       aria-label="Default select example">
                                    <option value="">Select gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </Field>
                                <ErrorMessage name="gender" component="div" className="text-danger"/>
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label htmlFor="address" className="col-sm-2 col-form-label">
                                Address
                            </label>
                            <div className="col-sm-10">
                                <Field as="select" name="address" className="form-select"
                                       aria-label="Default select example">
                                    <option value="">Select address</option>
                                    {provinces.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="address" component="div" className="text-danger"/>
                            </div>
                        </div>


                        <div className="mb-3">
                            <label htmlFor="img" className="form-label">
                                Choose image
                            </label>
                            <Field type="file" name="img" id="img" className="form-control"/>
                            <ErrorMessage name="img" component="div" className="text-danger"/>
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </Form>
                </Formik>
            </div>
        </>
    );
};

export default CreateStudentForm;
