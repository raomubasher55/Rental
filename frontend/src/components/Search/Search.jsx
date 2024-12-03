import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Search = () => {
    const [showSearchResults, setShowSearchResults] = useState(false); // Manage dropdown visibility
    const [formData, setFormData] = useState({
      craneName: "",
      category: "",
      subcategory: "",
      minPrice: 0,
      maxPrice: 10000,
      latitude: "",
      longitude: "",
      radius: 10,
      sortBy: "price",
      order: "asc",
    });
    
    const [cranes, setCranes] = useState([]); // To hold search results
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    // Handle form data changes
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
    
    const fetchCranes = async () => {
      const params = new URLSearchParams(formData).toString();
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}/api/crane/search?${params}`);
        setCranes(response.data.data);
      } catch (error) {
        console.error("Error fetching cranes", error);
      } finally {
        setLoading(false);
      }
    };
    
    useEffect(() => {
      if (
        formData.craneName ||
        formData.category ||
        formData.subcategory ||
        formData.minPrice ||
        formData.maxPrice ||
        formData.latitude ||
        formData.longitude ||
        formData.radius
      ) {
        fetchCranes();
      }
    }, [formData]);
    
    return (
        <li className="relative">
        <input
          type="text"
          placeholder="Search"
          className="py-1 px-4 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          onFocus={() => setShowSearchResults(true)} 
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, craneName: e.target.value }))
          }
        />
      
        {showSearchResults && (
          <div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 min-h-[80%] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg z-10"
            onMouseLeave={() => setShowSearchResults(false)}
          >
            <div className="p-4 border-b">
              <form className="space-y-2">
                <div>
                  <label>Category:</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 p-2"
                  >
                    <option value="">All Categories</option>
                    <option value="Aerial Platforms">Aerial Platforms</option>
                    <option value="Lifting Equipment">Lifting Equipment</option>
                    {/* Add more categories */}
                  </select>
                </div>
      
                <div>
                  <label>Subcategory:</label>
                  <select
                    name="subcategory"
                    value={formData.subcategory}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 p-2"
                  >
                    <option value="">All Subcategories</option>
                    <option value="Self-propelled platforms">
                      Self-propelled platforms
                    </option>
                    {/* Add more subcategories */}
                  </select>
                </div>
      
                <div>
                  <label>Min Price: ${formData.minPrice}</label>
                  <input
                    type="range"
                    name="minPrice"
                    min="0"
                    max="10000"
                    value={formData.minPrice}
                    onChange={handleChange}
                    className="block w-full"
                  />
                </div>
      
                <div>
                  <label>Max Price: ${formData.maxPrice}</label>
                  <input
                    type="range"
                    name="maxPrice"
                    min="0"
                    max="10000"
                    value={formData.maxPrice}
                    onChange={handleChange}
                    className="block w-full"
                  />
                </div>
              </form>
            </div>
      
            {/* Lower Section: Results */}
            <div className="p-4 max-h-64 overflow-y-auto">
              {loading ? (
                <div>Loading...</div>
              ) : cranes?.length > 0 ? (
                cranes.map((crane) => (
                  <div
                  onClick={() => navigate(`/detail/${crane._id}`)}
                    key={crane._id}
                    className="p-2 border-b hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    <h3 className="font-bold">{crane.craneName}</h3>
                    <p>
                      {crane.category} - ${crane.rentalPricePerDay} per day
                    </p>
                  </div>
                ))
              ) : (
                <div>No results found</div>
              )}
            </div>
          </div>
        )}
      </li>
      
    );
    
};

export default Search;
