import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    const fetchListing = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/listing/get-single/${id}`
      );

      setFormData({
        title: data.listing.title,
        description: data.listing.description,
        price: data.listing.price,
        location: data.listing.location?.city || "",
        image: null,
      });

      setPreviewImage(data.listing.images?.[0]?.url);
    };

    fetchListing();
  }, [id]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });

      if (file) {
        setPreviewImage(URL.createObjectURL(file));
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const submitData = new FormData();

      submitData.append("title", formData.title);
      submitData.append("description", formData.description);
      submitData.append("price", formData.price);
      submitData.append("location", formData.location);

      if (formData.image) {
        submitData.append("images", formData.image);
      }

      await axios.put(
        `http://localhost:5000/listing/update/${id}`,
        submitData,
        { withCredentials: true }
      );

      alert("Listing updated successfully ✅");
      navigate("/my-listings");

    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-lg rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-6">
          Edit Listing
        </h2>

        <div className="mb-5">
          <label className="block text-sm font-semibold mb-2">
            Product Title
          </label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product title"
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-semibold mb-2">
            Product Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter detailed description"
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-semibold mb-2">
            Price (₹)
          </label>
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter price"
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-semibold mb-2">
            Location (City)
          </label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter city"
          />
        </div>

        {previewImage && (
          <div className="mb-5">
            <label className="block text-sm font-semibold mb-2">
              Current Image
            </label>
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-48 object-cover rounded-md"
            />
          </div>
        )}

        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">
            Change Image
          </label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Update Listing
        </button>
      </form>
    </div>
  );
};

export default EditListing;