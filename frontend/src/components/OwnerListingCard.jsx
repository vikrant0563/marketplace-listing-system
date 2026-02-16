import { useNavigate } from "react-router-dom";

const OwnerListingCard = ({ listing, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">

      <div className="h-48 w-full overflow-hidden">
        <img
          src={
            listing.images?.[0]?.url ||
            "https://via.placeholder.com/300"
          }
          alt={listing.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">

        <h2 className="text-lg font-semibold">
          {listing.title}
        </h2>

        <p className="text-green-600 font-bold">
          ₹ {listing.price}
        </p>

        <p className="text-gray-500 text-sm">
          📍 {listing.location?.city}
        </p>

        <div className="mt-4 flex justify-between items-center">
          <span className="text-xs text-gray-400">
            Created: {new Date(listing.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={() => navigate(`/update/${listing._id}`)}
            className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(listing._id)}
            className="bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
};

export default OwnerListingCard;