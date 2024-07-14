import React, { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import { fetchGet } from "../apis/fetch";
const Profile = () => {
  const [user, setUser] = useState([]);
  const [loading, setloading] = useState(false);
  const fetchProfile = async () => {
    const res = await fetchGet(
      "auth/getprofile?id=" + localStorage.getItem("id"),
      localStorage.getItem("token")
    );
    console.log(res);
    setUser(res.all);
    setloading(true);
    console.log(user);
  };
  useEffect(() => {
    fetchProfile();

    return () => {};
  }, []);

  return (
    loading && (
      <div className="max-w-lg mx-auto my-32 p-8 bg-white shadow-lg rounded-lg">
        <div className="flex justify-center">
          <CiUser className="h-24 w-24 text-gray-500" />
        </div>
        <ul className="mt-6 space-y-4">
          <li className="flex items-center">
            <span className="font-semibold text-gray-700">Email: </span>
            <span className="ml-2 text-gray-600">{user[0].email}</span>
          </li>
          <li className="flex items-center">
            <span className="font-semibold text-gray-700">
              Contact Number:{" "}
            </span>
            <span className="ml-2 text-gray-600">{user[0].contact}</span>
          </li>
        </ul>
      </div>
    )
  );
};

export default Profile;
