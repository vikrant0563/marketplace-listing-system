import { Link } from "react-router-dom";

const ListingCard = ({ listing }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">

      <div className="h-48 w-full overflow-hidden">
        <img
          src={listing.images?.[0]?.url || "https://via.placeholder.com/300"}
          alt={listing.title}
          className="w-full h-full object-cover"
        />
      </div>


      <div className="p-4">

     
        <h2 className="text-xl font-bold text-green-600">
          ₹ {listing.price}
        </h2>

    
        <h3 className="text-lg font-semibold mt-1">
          {listing.title}
        </h3>

     
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {listing.description}
        </p>
  
        <p className="text-xs text-gray-400 mt-1">
          Seller: {listing.seller?.email}
        </p>
         <p className="text-xs text-gray-400 mt-1">
          Phone: {listing.seller?.phone}
        </p>

   
        {listing.category && (
          <p className="text-xs text-blue-500 mt-1">
            Category: {listing.category.name}
          </p>
        )}

    
        <Link
          to={`/listing/${listing._id}`}
          className="block mt-3 bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ListingCard;