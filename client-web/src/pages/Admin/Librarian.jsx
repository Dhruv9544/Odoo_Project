import React, { useEffect, useState } from "react";
import Datatable from "../../components/DataTable";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import AddLibrarianForm from "../../components/Admin/AddLibrarianForm";
import { fetchGet } from "../../apis/fetch";

function Librarian() {
    const datatableArray = [
        { field: "index", header: "Sr no." },
        { field: "username", header: "Username" },
        { field: "email", header: "Email" },
        { field: "contact", header: "Phone No." },
        { field: "libraryname", header: "Library Name" },
    ];
    const [visibility, setVisibility] = useState(false);
    const [librarian, setLibrarian] = useState();
    const [loading, setLoading] = useState(false);

    const getLibrary = async () => {
        const lib = await fetchGet(
            "library/alllibrary",
            localStorage.getItem("token")
        );
        console.log(lib.libraries);
        setLibrarian(lib.libraries);
        setLoading(true);
    };
    useEffect(() => {
        getLibrary();
    }, []);

    return (
        loading && (
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
                        <AddLibrarianForm
                            getlibrary={() => {
                                getLibrary();
                            }}
                            visible={() => {
                                setVisibility(false);
                            }}
                        ></AddLibrarianForm>
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
                    <Datatable
                        data={librarian}
                        array={datatableArray}
                    ></Datatable>
                </div>
            </>
        )
    );
}

export default Librarian;
