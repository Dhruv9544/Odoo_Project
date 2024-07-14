import React, { useEffect, useState } from "react";
import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../../assets/logo.jpg";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
export const LibrarianHeader = () => {
  const [loading, setloading] = useState(false);

  useEffect(() => {
    if (
      localStorage.getItem("token") == undefined ||
      localStorage.getItem("role") != "Librarian"
    ) {
      window.location.href = "/";
    } else {
      setloading(true);
    }

    return () => {};
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const LogoutHandler = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You redirect to Login page...",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        navigate("/");
      }
    });
  };
  return (
    <div className="bg-[#f8f9fa] font-family-karla flex ">
      <aside className="relative  bg-[#13459c] w-1/5  hidden sm:block shadow-xl shadow-gray-200 h-screen overflow-y-hidden ">
        <div className=" top-0 left-0 p-6 text-center">
          <img
            src={logo}
            alt="symbol"
            className="opacity-70 w-36 h-36 rounded-full  m-auto  "
          />
          <Link
            to={"/admin"}
            className="text-white text-3xl  first-letter:font-semibold uppercase hover:text-gray-300 "
          >
            Librarian
          </Link>
        </div>
        <nav className=" text-base font-semibold pt-3 overflow-y-scroll h-4/6">
          <div className=" hover:shadow-white hover:shadow-md">
            <Link
              to={"profile"}
              className="flex items-center active-nav-link text-white py-4 pl-6 nav-item gap-2 focus:outline-none focus:shadow-md focus:shadow-gray-500"
            >
              <FaMoneyCheckAlt />
              Profile
            </Link>
          </div>

          <div className=" hover:shadow-white hover:shadow-md">
            <Link
              to={"allbooks"}
              className="flex items-center active-nav-link text-white py-4 pl-6 nav-item gap-2 focus:outline-none focus:shadow-md focus:shadow-gray-500"
            >
              <FaMoneyBillTrendUp />
              Books
            </Link>
          </div>
        </nav>
      </aside>

      <div className="w-full flex flex-col h-screen overflow-y-hidden ">
        <header className="w-full items-center  bg-[#196bde] shadow-gray-900 shadow-md  py-2 px-6 hidden sm:flex">
          <div className="w-1/2"></div>
          <div
            x-data="{ isOpen: false }"
            className="relative w-1/2 flex justify-end"
          >
            <button
              onClick={LogoutHandler}
              className="realtive z-10 flex  px-2 rounded-lg h-12 hover:shadow-md hover:shadow-gray-800 bg-white overflow-hidden hover:bg-gray-200 hover:border-gray-300 focus:border-gray-300 focus:outline-none "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 m-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
              <div className="m-auto">Logout</div>
            </button>
            <button
              style={{ display: isOpen ? "block" : "none" }}
              onClick={() => setIsOpen(false)}
              className="h-full w-full fixed inset-0 cursor-default"
            ></button>
          </div>
        </header>

        <header
          x-data="{ isOpen: false }"
          className="w-full bg-[#3d68ff] py-5 px-6 sm:hidden"
        >
          <div className="flex items-center justify-between">
            <Link className="text-white text-3xl font-semibold uppercase hover:text-gray-300">
              Admin
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white text-3xl focus:outline-none"
            >
              <svg
                style={{ display: isOpen ? "none" : "block" }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                style={{ display: isOpen ? "block" : "none" }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          <nav className={isOpen ? "flex flex-col" : "hidden"}>
            <Link
              to={""}
              className="flex items-center active-nav-link text-white py-2 pl-4 nav-item"
            >
              <i className="fas fa-tachometer-alt mr-3"></i>
              Dashboard
            </Link>
            <Link
              //   onClick={LogoutHandler}
              className="flex items-center active-nav-link text-white py-2 pl-4 nav-item"
            >
              <i className="fas fa-tachometer-alt mr-3"></i>
              Logout
            </Link>
            <div>
              <NavLink to={"addauthority"}>
                <button className="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
                  <i className="fas fa-plus mr-3"></i> Add Authority
                </button>
              </NavLink>
              <NavLink to={""}>
                <button className="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
                  <i className="fas fa-plus mr-3"></i> Add Sports Complex
                </button>
              </NavLink>
              <NavLink to={"addfacility"}>
                <button className="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
                  <i className="fas fa-plus mr-3"></i> Add Facility
                </button>
              </NavLink>
            </div>
          </nav>
        </header>

        <div className="w-full overflow-x-hidden border-t flex flex-col scrollbar ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
