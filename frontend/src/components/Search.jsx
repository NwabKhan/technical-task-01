import React from "react";
import { useEffect, useState } from "react";
import Card from "./Card";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    searchTerm: "",
    firstname: "",
    lastname: "",
    gender: "",
    dob: "",
    profession: "",
    shoesize: "",
    hairColor: "",
    hairLength: "",
    waistSize: "",
    height: "",
    weight: "",
    castings: "",
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);
  //If there are some changes in the URL(query) do that in the sidebar as well
  useEffect(() => {
    //So first getting all values from query
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const firstnameFromUrl = urlParams.get("firstname");
    const lastnameFromUrl = urlParams.get("lastname");
    const genderFromUrl = urlParams.get("gender");
    const dobFromUrl = urlParams.get("dob");
    const professionFromUrl = urlParams.get("profession");
    const shoesizeFromUrl = urlParams.get("shoesize");
    const hairColorFromUrl = urlParams.get("hairColor");
    const hairLengthFromUrl = urlParams.get("hairLength");
    const waistSizeFromUrl = urlParams.get("waistSize");
    const heightFromUrl = urlParams.get("height");
    const weightFromUrl = urlParams.get("weight");
    const castingsFromUrl = urlParams.get("castings");

    //If something is changed, set formData data to new one
    if (
      searchTermFromUrl ||
      firstnameFromUrl ||
      lastnameFromUrl ||
      genderFromUrl ||
      dobFromUrl ||
      professionFromUrl ||
      shoesizeFromUrl ||
      hairColorFromUrl ||
      hairLengthFromUrl ||
      waistSizeFromUrl ||
      heightFromUrl ||
      weightFromUrl ||
      castingsFromUrl
    ) {
      setFormData({
        searchTerm: searchTermFromUrl || "",
        firstname: firstnameFromUrl || "",
        lastname: lastnameFromUrl || "",
        gender: genderFromUrl || "",
        dob: dobFromUrl || "",
        profession: professionFromUrl || "",
        shoesize: shoesizeFromUrl || "",
        hairColor: hairColorFromUrl || "",
        hairLength: hairLengthFromUrl || "",
        waistSize: waistSizeFromUrl || "",
        height: heightFromUrl || "",
        weight: weightFromUrl || "",
        castings: castingsFromUrl || "",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/models/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", formData.searchTerm);
    urlParams.set("firstname", formData.firstname);
    urlParams.set("lastname", formData.lastname);
    urlParams.set("gender", formData.gender);
    urlParams.set("dob", formData.dob);
    urlParams.set("profession", formData.profession);
    urlParams.set("shoesize", formData.shoesize);
    urlParams.set("hairColor", formData.hairColor);
    urlParams.set("hairLength", formData.hairLength);
    urlParams.set("waistSize", formData.waistSize);
    urlParams.set("height", formData.height);
    urlParams.set("weight", formData.weight);
    urlParams.set("castings", formData.castings);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  const currentDate = new Date().toISOString().split("T")[0];
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-4 bg-slate-600 border-b-2 md:border-r-2 md:min-h-screen md:w-2/5 w-full">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded p-8"
        >
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
              <label className="label_styles" htmlFor="firstname">
                Search Term:
              </label>
              <input
                type="text"
                id="searchTerm"
                name="searchTerm"
                maxLength="62"
                minLength="2"
                value={formData.searchTerm}
                onChange={handleChange}
                className="input_styles"
                
                placeholder="Search"
              />
            </div>
            <div>
              <label className="label_styles" htmlFor="firstname">
                First Name
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                maxLength="62"
                minLength="2"
                value={formData.firstname}
                onChange={handleChange}
                className="input_styles"
                
                placeholder="Enter your first name"
              />
            </div>

            <div>
              <label className="label_styles" htmlFor="lastname">
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                maxLength="62"
                minLength="2"
                value={formData.lastname}
                onChange={handleChange}
                className="input_styles"
                
                placeholder="Enter your last name"
              />
            </div>
            <div>
              <label className="label_styles" htmlFor="picture">
                Picture URL (valid image URL)
              </label>
              <input
                type="text"
                id="picture"
                name="picture"
                pattern="https?://.*\.(png|jpg|jpeg|gif)(\?.*)?$"
                title="Please enter a valid image URL!"
                value={formData.picture}
                onChange={handleChange}
                className="input_styles"
                
                minLength="8"
                placeholder="Enter picture URL"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 ">
            <div>
              <label className="label_styles" htmlFor="dob">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                max={currentDate}
                min="1940-01-01"
                className="input_styles"
                
              />
            </div>
            <div>
              <label className="label_styles" htmlFor="profession">
                Profession
              </label>
              <select
                id="profession"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                className="input_styles"
                
              >
                <option value="">Select Profession</option>
                <option value="commedian">Commedian</option>
                <option value="actor">Actor</option>
                <option value="actress">Actress</option>
                <option value="model">Model</option>
              </select>
            </div>
          </div>
          <div>
            <label className="label_styles">Gender</label>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                  className="form-radio h-5 w-5 text-blue-600"
                  
                />
                <span className="ml-2">Male</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2">Female</span>
              </label>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="label_styles" htmlFor="shoesize">
                Shoe Size
              </label>
              <input
                type="number"
                id="shoesize"
                name="shoesize"
                value={formData.shoesize}
                min={0}
                max={50}
                onChange={handleChange}
                className="input_styles"
                
                placeholder="Enter shoe size"
              />
            </div>
            <div>
              <label className="label_styles" htmlFor="hairColor">
                Hair Color
              </label>
              <input
                type="number"
                id="hairColor"
                name="hairColor"
                min={0}
                value={formData.hairColor}
                onChange={handleChange}
                className="input_styles"
                
                placeholder="Enter hair color code"
              />
            </div>
            <div>
              <label className="label_styles" htmlFor="hairLength">
                Hair Length
              </label>
              <input
                type="number"
                id="hairLength"
                name="hairLength"
                value={formData.hairLength}
                min={0}
                max={100}
                onChange={handleChange}
                className="input_styles"
                
                placeholder="Enter hair length"
              />
            </div>

            <div>
              <label className="label_styles" htmlFor="waistSize">
                Waist Size
              </label>
              <input
                type="number"
                id="waistSize"
                name="waistSize"
                min={0}
                max={100}
                value={formData.waistSize}
                onChange={handleChange}
                className="input_styles"
                
                placeholder="Enter waist size"
              />
            </div>
            <div>
              <label className="label_styles" htmlFor="height">
                Height (cm)
              </label>
              <input
                type="number"
                id="height"
                name="height"
                min={0}
                max={250}
                value={formData.height}
                onChange={handleChange}
                className="input_styles"
                
                placeholder="Enter height"
              />
            </div>
            <div>
              <label className="label_styles" htmlFor="weight">
                Weight
              </label>
              <input
                type="number"
                id="weight"
                name="weight"
                min={0}
                max={250}
                value={formData.weight}
                onChange={handleChange}
                className="input_styles"
                
                placeholder="Enter weight"
              />
            </div>
          </div>
          <div className=" w-4/5 mb-4">
            <label className="label_styles" htmlFor="castings">
              What type of castings you will like to attend?
            </label>
            <select
              id="castings"
              name="castings"
              value={formData.castings}
              onChange={handleChange}
              className="input_styles"
            >
              <option value="">Select castings</option>
              <option value="movies">Movies</option>
              <option value="commercials">Commercials</option>
              <option value="newspapers">Newspapers</option>
              <option value="magazines">Magazines</option>
            </select>
          </div>

          <div className="w-full flex items-center justify-center">
            <button
              disabled={loading}
              type="submit"
              className="p-3 w-4/5 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Listing results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && listings.length === 0 && (
            <p className="text-xl text-slate-700">No listing found!</p>
          )}
          {loading && (
            <p className="text-xl text-slate-700 text-center w-full">
              Loading...
            </p>
          )}

          {!loading &&
            listings &&
            listings.map((listing) => (
              <Card key={listing._id} listing={listing} />
            ))}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className="text-green-700 hover:underline p-7 text-center w-full"
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
