import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OwnerListingCard from "../components/OwnerListingCard.jsx";

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  const fetchMyListings = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/listing/get-my-listings",
        { withCredentials: true }
      );
      setListings(data.listings);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchMyListings();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?"))
      return;

    try {
      await axios.delete(
        `http://localhost:5000/listing/delete/${id}`,
        { withCredentials: true }
      );

      fetchMyListings();

    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">My Listings</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {listings.map((item) => (
          <OwnerListingCard
            key={item._id}
            listing={item}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default MyListings;