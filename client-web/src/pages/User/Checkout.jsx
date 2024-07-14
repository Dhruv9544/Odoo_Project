import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchPost } from "../../apis/fetch";

const Checkout = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("session_id");
  const navigate = useNavigate();

  const bookData = JSON.parse(localStorage.getItem("book"));

  const data = {
    book: bookData._id,
    startDate: localStorage.getItem("start"),
    endDate: localStorage.getItem("end"),
    price: bookData.price * localStorage.getItem("quantity"),
    status: "success",
    quantity: localStorage.getItem("quantity"),
    session_id: sessionId,
    user: localStorage.getItem("id"),
  };

  const postPaymentData = async () => {
    const res = await fetchPost(
      "payment/addPayment",
      localStorage.getItem("token"),
      JSON.stringify(data)
    );
    navigate("/user");
  };

  useEffect(() => {
    postPaymentData();
  }, []);

  return <div>Processing payment...</div>;
};

export default Checkout;
