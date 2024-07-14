import { useParams } from "react-router-dom";
import { fetchGet } from "../../apis/fetch";
import { useEffect, useState } from "react";
import Payment from "../Payment";

const BookMainpage = () => {
  const urlParams = useParams();
  // console.log(urlParams);
  const [book, setBook] = useState([]);
  const [loading, setloading] = useState(false);

  async function getAllFurniture() {
    const response = await fetchGet(`getBook?_id=${urlParams.name}`);
    setBook(response);
    setloading(true);
    console.log(response);
  }
  useEffect(() => {
    getAllFurniture();
    return () => {};
  }, []);

  return (
    loading && (
      <div>
        <div class="container mx-auto p-8">
          <div class="flex flex-col lg:flex-row items-center lg:items-start">
            <div class="flex-1 p-4">
              <h1 class="text-4xl font-bold text-black mb-4">
                Name: {book[0].title}
              </h1>
              <p class="text-lg text-gray-500 flex items-center mb-4">
                Author: {book[0].author}
              </p>
              <p class="text-black-600 font-semibold mb-4">
                Publisher: {book[0].publisher}
              </p>
              <p class="text-black-600 font-semibold mb-4">
                Quantity: {book[0].quantity}
              </p>
              <p class="text-xl text-gray-900 font-bold mb-6">
                Price: ₹ {book[0].price}
              </p>
              <Payment book={book[0]}></Payment>
            </div>
            <div class="flex-1 p-4 flex justify-center items-center">
              <img
                src={`${book[0].image}`}
                alt="Furniture Image"
                class="w-auto h-96 max-w-full object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default BookMainpage;
