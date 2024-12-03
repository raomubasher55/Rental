import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const Signup = () => {
    const [credential, setCredential] = useState({
        referenceName: "",
        companyName: "",
        email: "",
        phoneNumber: "",
        whatsappNumber: "",
        password: "",
        city: "", // Added city
        address: "", // Added address
        latitude: "", // Added latitude
        longitude: "", // Added longitude
    });
    const [password, setPassword] = useState(true);
    const navigate = useNavigate();
    const mapRef = useRef(null);  // Store map instance
    const markerRef = useRef(null);  // Store the marker instance

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });

        // If the field being changed is the address, trigger geocoding
        if (e.target.name === 'address') {
            geocodeAddress(e.target.value); // Call the geocoding function
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/v1/company/register-company`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                referenceName: credential.referenceName,
                companyName: credential.companyName,
                email: credential.email,
                phoneNumber: credential.phoneNumber,
                whatsappNumber: credential.whatsappNumber,
                password: credential.password,
                city: credential.city,
                address: credential.address,
                latitude: credential.latitude,
                longitude: credential.longitude,
            }),
        });
        const data = await response.json();
        console.log(data);
        

        if (!data.success) {
            if (data.errors) {
                toast.error(data.errors[0].msg, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } else {
                toast.error(data.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        } else {
            toast.success(data.message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            navigate('/');
        }
    };

    const geocodeAddress = async (address) => {
        if (!address) return;

        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`);
            const data = await response.json();

            if (data && data.length > 0) {
                const { lat, lon } = data[0];  // Get latitude and longitude from the response
                const latitude = parseFloat(lat);
                const longitude = parseFloat(lon);

                // Update the map and marker position
                if (mapRef.current && markerRef.current) {
                    const map = mapRef.current;
                    const marker = markerRef.current;

                    map.setView([latitude, longitude], 13);
                    marker.setLatLng([latitude, longitude]);

                    // Update the form fields with the new latitude and longitude
                    setCredential((prev) => ({
                        ...prev,
                        latitude,
                        longitude
                    }));
                }
            }
        } catch (error) {
            console.error('Error fetching geocoding data:', error);
        }
    };

    useEffect(() => {
        // Initialize the map only once
        if (!mapRef.current) {
            const map = L.map('map').setView([51.505, -0.09], 13);
            mapRef.current = map; // Store the map instance

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map);

            const marker = L.marker([51.505, -0.09], { draggable: true }).addTo(map);
            markerRef.current = marker;  // Store the marker instance

            // Update latitude and longitude when marker is dragged
            marker.on('dragend', function (e) {
                const { lat, lng } = marker.getLatLng();
                setCredential((prev) => ({
                    ...prev,
                    latitude: lat,
                    longitude: lng
                }));
            });
        }
    }, []);

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-background pt-3">
                <div className="bg-card dark:bg-card p-8 rounded-lg shadow-l bg-slate-100 w-full max-w-md flex flex-col items-">
                    <div className='flex flex-col justify-center items-center'>
                        <p className="text-3xl font-bold mb-6">Register Your Company</p>
                        <img className='w-[40%]' src="https://panto.elliptical.website/website/assets/images/logo.png" alt="Logo" />
                    </div>
                    <form onSubmit={handleSubmit} className="w-full">
                        {/* Reference Name */}
                        <div className="mb-4">
                            <input type="text" placeholder="Reference Name" name='referenceName' onChange={onChange} value={credential.referenceName} className="w-full p-3 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400" />
                        </div>
                        {/* Company Name */}
                        <div className="mb-4">
                            <input type="text" placeholder="Company Name" name='companyName' onChange={onChange} value={credential.companyName} className="w-full p-3 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400" />
                        </div>
                        {/* Email */}
                        <div className="mb-4">
                            <input type="email" placeholder="Email" name='email' onChange={onChange} value={credential.email} className="w-full p-3 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400" />
                        </div>
                        {/* Phone Number */}
                        <div className="mb-4">
                            <input type="text" placeholder="Phone Number" name='phoneNumber' onChange={onChange} value={credential.phoneNumber} className="w-full p-3 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400" />
                        </div>
                        {/* WhatsApp Number */}
                        <div className="mb-4">
                            <input type="text" placeholder="WhatsApp Number" name='whatsappNumber' onChange={onChange} value={credential.whatsappNumber} className="w-full p-3 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400" />
                        </div>
                        {/* Password */}
                        <div className="mb-4 relative">
                            <input
                                onChange={onChange} value={credential.password} type={password ? 'password' : 'text'} name="password" placeholder="Password"
                                className="w-full p-3 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 pr-10"
                            />
                            <button type="button" className="absolute inset-y-0 right-0 flex items-center px-3 text-zinc-400 dark:text-zinc-500" >
                                <span onClick={() => setPassword(!password)} className='pr-4 inline-block' >{password ? <FaRegEye /> : <FaRegEyeSlash />}  </span>
                            </button>
                        </div>
                        {/* City */}
                        <div className="mb-4">
                            <input type="text" placeholder="City" name='city' onChange={onChange} value={credential.city} className="w-full p-3 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400" />
                        </div>
                        {/* Address */}
                        <div className="mb-4">
                            <input type="text" placeholder="Address" name='address' onChange={onChange} value={credential.address} className="w-full p-3 border rounded-lg" />
                        </div>

                        {/* Map (Optional) - Display to help the user choose their location */}
                        <div className="mb-4">
                            <div id="map" className="h-64 w-full mb-4"></div> {/* Map Container */}
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="w-full bg-blue-500 dark:bg-blue-500 text-white dark:text-white p-3 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-600">Register</button>
                    </form>
                    <div className="text-center mt-4 text-sm text-primary dark:text-primary-foreground">
                        By continuing, you agree to Shark's <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>
                        <hr className="my-4 border-t border-gray-400" />
                        <Link to="/auth/company/login" className="text-blue-500 block"> Already have an account? Login</Link>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
};

export default Signup;
