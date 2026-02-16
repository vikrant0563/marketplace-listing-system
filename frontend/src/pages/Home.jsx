import { useEffect, useState } from "react";
import axios from "axios";
import ListingCard from "../components/ListingCard.jsx";

const Home = () => {
  const [listings, setListings] = useState([]);
  const [categories, setCategories] = useState([]);

  const [filters, setFilters] = useState({
    keyword: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/catagory/get-all-category"
      );
      setCategories(data.categories);
    };

    fetchCategories();
  }, []);

  const fetchListings = async () => {
    const query = new URLSearchParams(filters).toString();

    const { data } = await axios.get(
      `http://localhost:5000/listing/get-all-listings?${query}`
    );

    setListings(data.listings);
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">

      <h2 className="text-2xl font-bold mb-6">All Listings</h2>

      <div className="bg-white p-4 rounded shadow mb-6 grid md:grid-cols-4 gap-4">

        <input
          type="text"
          name="keyword"
          placeholder="Search..."
          className="p-2 border rounded"
          onChange={handleChange}
        />

        <select
          name="category"
          className="p-2 border rounded"
          onChange={handleChange}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          className="p-2 border rounded"
          onChange={handleChange}
        />

        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          className="p-2 border rounded"
          onChange={handleChange}
        />

        <button
          onClick={fetchListings}
          className="bg-blue-600 text-white px-4 py-2 rounded md:col-span-4"
        >
          Apply Filters
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {listings.map((item) => (
          <ListingCard key={item._id} listing={item} />
        ))}
      </div>

      {listings.length === 0 && (
        <p className="text-center mt-6 text-gray-500">
          No listings found.
        </p>
      )}
    </div>
  );
};

export default Home;