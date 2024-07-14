import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { fetchGet } from "../../apis/fetch";

const AllBooks = () => {
    const [book, setBook] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState(null);

    useEffect(() => {
        getAllBook();
    }, [search]);

    async function getAllBook() {
        setLoading(true);
        const response = await fetchGet(
            `getBook?${selectedFilter}=${search}`,
            localStorage.getItem("token")
        );
        setBook(response); // assuming response.data contains the book array
        setLoading(false);
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
                            placeholder="Search book"
                            className="border p-2 rounded w-full"
                            onChange={(e) => setSearch(e.target.value)}
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
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        book.map((item, index) => (
                            <div
                                className="bg-white min-w-[32%] max-w-[32%] rounded-lg shadow-lg overflow-hidden"
                                key={index}
                            >
                                {console.log(item)}
                                <img
                                    src={`${item.image}`}
                                    className="w-full h-48 object-contain"
                                    alt={item.title ? item.title : "book"}
                                />
                                <div className="p-4">
                                    <Link to={`${item._id}`}>
                                        {console.log(item._id)}
                                        {item.title && (
                                            <h2 className="text-lg font-light">
                                                {item.title}
                                            </h2>
                                        )}
                                        {item.publisher && (
                                            <p className="text-gray-600">
                                                {item.publisher}
                                            </p>
                                        )}
                                        {item.year && (
                                            <p className="font-bold">
                                                Rent Price: ₹ {item.price}
                                            </p>
                                        )}
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </main>
    );
};

export default AllBooks;
