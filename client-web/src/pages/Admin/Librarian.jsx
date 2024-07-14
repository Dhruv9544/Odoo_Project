import React, { useState } from "react";
import Datatable from "../../components/DataTable";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import AddLibrarianForm from "../../components/Admin/AddLibrarianForm";

function Librarian() {
    const datatableArray = [
        { field: "index", header: "Sr no." },
        { field: "username", header: "Username" },
        { field: "email", header: "Email" },
        { field: "phone", header: "Phone No." },
        { field: "libraryname", header: "Library Name" },
    ];
    const [visibility, setVisibility] = useState(false);
    const data = [
        {
            index: 1,
            username: "Mihir",
            email: "hauc",
            phone: "790739186",
            libraryname: "ihir",
        },
    ];
    return (
        <>
            <div className="p-5">
                <Dialog
                    visible={visibility}
                    className="w-[50%]"
                    draggable={false}
                    onHide={() => {
                        setVisibility(false);
                    }}
                >
                    <AddLibrarianForm></AddLibrarianForm>
                </Dialog>
                <div className="flex justify-end">
                    <Button
                        type="button"
                        rounded
                        className="rounded-md flex items-center space-x-1"
                        onClick={() => {
                            setVisibility(true);
                        }}
                    >
                        <span>Add Librarian</span>
                    </Button>
                </div>
                <Datatable data={data} array={datatableArray}></Datatable>
            </div>
        </>
    );
}

export default Librarian;
