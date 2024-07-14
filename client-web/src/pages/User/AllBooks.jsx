import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { fetchGet } from "../../apis/fetch";

const AllBooks = () => {
  const [furniture, setFurniture] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);

  useEffect(() => {
    getAllFurniture();
  }, []);

  async function getAllFurniture() {
    const response = await fetchGet(`getBook`, localStorage.getItem("token"));
    // if (response.status == "success") {
    setFurniture(response);
    // }
    console.log(response);
  }

  const filterOptions = [
    { label: "Title", value: "title" },
    { label: "Author", value: "author" },
    { label: "Genre", value: "genre" },
  ];

  return (
    <main className="bg-gray-100">
      <div className="container mx-auto p-4">
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search Furniture"
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="flex-1">
            <Dropdown
              value={selectedFilter}
              options={filterOptions}
              onChange={(e) => setSelectedFilter(e.value)}
              placeholder="Select a Filter"
              className="w-full"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {furniture.map((item, index) => (
            <div
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              key={index}
            >
              {console.log(item)}
              <img
                src={`${item.image}`}
                className="w-full h-48 object-contain"
                alt="Furniture"
              />
              <div className="p-4">
                <Link to={`${item._id}`}>
                  <h2 className="text-lg font-light">{item.title}</h2>
                  <p className="text-gray-600">{item.publisher}</p>
                  <p className="font-bold">Rent Price: {item.year / 100}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default AllBooks;
