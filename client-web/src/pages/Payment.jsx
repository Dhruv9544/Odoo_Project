import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import axios from "axios";
import "primereact/resources/themes/saga-blue/theme.css"; // You can change the theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

function Payment({ book }) {
    const [visible, setVisible] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    localStorage.setItem("start", startDate);
    localStorage.setItem("end", endDate);

    const payment = async () => {
        localStorage.setItem("book", JSON.stringify(book));
        let res = await axios.post("http://localhost:9999/payment", {
            amount: book.price,
            name: book.title,
            startDate,
            endDate,
        });
        console.log(res);
        window.location.href = res.data.url;
    };

    const openDialog = () => {
        setVisible(true);
    };

    const closeDialog = () => {
        setVisible(false);
    };

    const handleSubmit = () => {
        closeDialog();
        payment();
    };

    return (
        <div>
            <Dialog
                header="Select Dates"
                visible={visible}
                onHide={closeDialog}
                footer={
                    <div>
                        <Button label="Submit" onClick={handleSubmit} />
                    </div>
                }
            >
                <div className="p-field">
                    <label htmlFor="startDate">Start Date</label>
                    <Calendar
                        value={startDate}
                        onChange={(e) => setStartDate(e.value)}
                        showIcon
                        dateFormat="dd/mm/yy"
                        placeholder="Select Start Date"
                        className="w-full"
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="endDate">End Date</label>
                    <Calendar
                        value={endDate}
                        onChange={(e) => setEndDate(e.value)}
                        showIcon
                        dateFormat="dd/mm/yy"
                        placeholder="Select End Date"
                        minDate={startDate}
                        className="w-full"
                    />
                </div>
            </Dialog>
            <Button size="large" className="bg-green-500" onClick={openDialog}>
                Pay Now
            </Button>
        </div>
    );
}

export default Payment;
