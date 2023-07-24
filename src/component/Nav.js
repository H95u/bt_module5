import {Link} from "react-router-dom";

export default function Nav() {



    return (
        <>
            <div className={"container"}>
            <Link to={"/create"} className={"btn btn-info"}>Add new student</Link>
            </div>
        </>
    )
}