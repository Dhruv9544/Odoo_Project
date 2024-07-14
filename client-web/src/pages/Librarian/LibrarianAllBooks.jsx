import React, { useEffect, useState } from "react";
import Datatable from "../../components/DataTable";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import AddLibrarianForm from "../../components/Admin/AddLibrarianForm";
import { fetchGet } from "../../apis/fetch";
import AddBooks from "./AddBooks";

function LibrarianAllBooks() {
  const datatableArray = [
    { field: "index", header: "Sr no." },
    { field: "ISBN", header: "ISBN" },
    { field: "title", header: "Title" },
    { field: "author", header: "Author" },
    { field: "genre", header: "Genre" },
    { field: "price", header: "Price" },
    { field: "publisher", header: "Publisher" },
    { field: "quantity", header: "Available Quantity" },
    { field: "year", header: "Year" },
  ];
  const [visibility, setVisibility] = useState(false);
  const [books, setbooks] = useState();
  const [loading, setLoading] = useState(false);

  const getBooks = async () => {
    const res = await fetchGet("getBook", localStorage.getItem("token"));
    console.log(res);
    setbooks(res);
    setLoading(true);
  };
  useEffect(() => {
    getBooks();
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
            <AddBooks
              getBooks={() => {
                getBooks();
              }}
              visible={() => {
                setVisibility(false);
              }}
            ></AddBooks>
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
              <span>Add books</span>
            </Button>
          </div>
          <Datatable data={books} array={datatableArray}></Datatable>
        </div>
      </>
    )
  );
}

export default LibrarianAllBooks;
