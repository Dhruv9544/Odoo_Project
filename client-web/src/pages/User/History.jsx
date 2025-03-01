import React, { useEffect, useState } from "react";
import { fetchGet } from "../../apis/fetch";
import Datatable from "../../components/DataTable";

function History() {
    const [data, setdata] = useState([]);
    const getHistory = async () => {
        const data = await fetchGet(
            "payment/" + localStorage.getItem("id"),
            localStorage.getItem("token")
        );
        setdata(data.data);
    };
    useEffect(() => {
        getHistory();
    }, []);
    const datatableArray = [
        { field: "book.title", header: "Book Name" },
        { field: "book.price", header: "Price" },
        { field: "quantity", header: "Quantity" },
        { field: "startDate", header: "Start Date" },
        { field: "endDate", header: "End Date" },
    ];
    return (
        <div className="p-5">
            <div className="font-bold text-3xl text-center">Past Record</div>
            <Datatable
                array={datatableArray}
                data={data.lessThanToday}
            ></Datatable>
            <div className="font-bold text-3xl text-center mt-8">
                Current Record
            </div>
            <Datatable
                array={datatableArray}
                data={data.greaterThanOrEqualToToday}
            ></Datatable>
        </div>
    );
}

export default History;
