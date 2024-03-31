import React, { useState } from "react";
import { Link } from "react-router-dom";
const SubscriptionForm = () => {

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    picture: "",
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

  const [message, setMessage] = useState(""); //To show the success or error msg
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setMessage("");
      const res = await fetch(
        `${import.meta.env.VITE_BASE_BACKEND_URL}/api/models/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
          }),
        }
      );

      const data = await res.json();
      setLoading(false);
      setMessage(data.message);

      // clear the form after saving data
      setFormData({
        firstname: "",
        lastname: "",
        picture: "",
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
    } catch (error) {
      setMessage(error.message);
      setLoading(false);
    }
  };

  //To limit date while selecting DOB
  const currentDate = new Date().toISOString().split("T")[0];
  
  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="text-right">
        <Link
          className="px-4 py-2 w-1/3 bg-slate-700 text-gray-50 rounded hover:opacity-80 duration-300 transition-all"
          to="/search"
        >
          Search Panel
        </Link>
      </div>
      <div className="max-w-7xl mx-auto">
        <div>
          <h1 className="text-3xl font-semibold text-center mb-4 ">
            Subscription Form
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded p-8"
        >
          {message && (
            <p className="text-red-700 text-sm text-center mb-2">{message}</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
                required
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
                required
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
                required
                minLength="8"
                placeholder="Enter picture URL"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 ">
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
                required
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
                required
              >
                <option value="">Select Profession</option>
                <option value="commedian">Commedian</option>
                <option value="actor">Actor</option>
                <option value="actress">Actress</option>
                <option value="model">Model</option>
              </select>
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
                    required
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
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
                required
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
                required
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
                required
                placeholder="Enter hair length"
              />
            </div>

            <div>
              <label className="label_styles" htmlFor="waistSize">
                Waist Size (cm)
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
                required
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
                required
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
                required
                placeholder="Enter weight"
              />
            </div>
          </div>
          <div className=" w-1/3 mb-4">
            <label className="label_styles" htmlFor="castings">
              What type of castings you will like to attend?
            </label>
            <select
              id="castings"
              name="castings"
              value={formData.castings}
              onChange={handleChange}
              className="input_styles"
              required
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
              className="p-3 w-1/3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-90 disabled:opacity-70 duration-300 transition-all"
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionForm;
