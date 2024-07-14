import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchPost } from "../../apis/fetch";

const Checkout = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("session_id");

  console.log(sessionId);

  const postPaymentData = async () => {
    const res = await fetchPost("");
  };

  useEffect(() => {
    postPaymentData();
  }, []);

  return <div>Processing payment...</div>;
};

export default Checkout;
