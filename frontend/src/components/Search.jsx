import React from "react";
import { useEffect, useState } from "react";
import Card from "./Card";
import { Link, useNavigate } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
  const [models, setModels] = useState([]);
  const [showMore, setShowMore] = useState(false);

  //I am changing the URL(query), on click of Search i.e handleSubmit
  //So, if there are some changes in the URL(query), make the new fetch call and
  //show those changes in the sidebar fields as well
  useEffect(() => {
    //So first getting all values from query
    const urlParams = new URLSearchParams(location.search);
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

    const fetchModels = async () => {
      try {
        setLoading(true);
        setShowMore(false);
        const searchQuery = urlParams.toString();
        const res = await fetch(
          `${
            import.meta.env.VITE_BASE_BACKEND_URL
          }/api/models/search?${searchQuery}`
        );
        const data = await res.json();

        //If there are more than 8 records, then show ShowMore btn
        if (data.length > 8) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
        setModels(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchModels();
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //To do changes in the URL, and then useEffect will call
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
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
    const numberOfModels = models.length;
    const startIndex = numberOfModels;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(
      `${
        import.meta.env.VITE_BASE_BACKEND_URL
      }/api/models/search?${searchQuery}`
    );
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setModels([...models, ...data]);
  };

  const clearFilters = () => {
    setFormData({
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
  };

  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <div className="flex flex-col md:flex-row">
      {/* Filter Section */}
      <div className="bg-gray-50 border-b-2 md:border-r-2 md:fixed relative md:min-h-screen md:w-[500px] w-full">
        <button
          className="md:absolute top-0 right-2 bg-gray-400 hover:bg-gray-500 duration-300 transition-all px-2 py-1 rounded mt-1"
          onClick={clearFilters}
        >
          Clear Filters
        </button>
        <form
          onSubmit={handleSubmit}
          className=" bg-gray-50 px-8 py-4 shadow-md md:min-h-screen"
        >
          <div className="grid grid-cols-1 gap-4 mb-2">
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2 ">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
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
          <div className=" w-4/5 mb-2">
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
              className="p-3 w-4/5 bg-slate-700 text-white rounded-lg uppercase duration-300 transition-all hover:opacity-90 disabled:opacity-70"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>
      </div>

      {/* Result section */}
      <div className="flex-1 md:ml-[500px] ml-0 ">
        <div className="flex justify-between items-center border-b px-4 pb-2 mb-2">
          <h1 className="text-3xl font-semibold text-slate-700 mt-4">
            Model results:
          </h1>
          <Link
            className="bg-gray-400 hover:bg-gray-500 duration-300 transition-all px-2 py-1 rounded mt-1"
            to="/"
          >
            Go Back
          </Link>
        </div>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && models.length === 0 && (
            <p className="text-xl text-slate-700">No model found!</p>
          )}
          {loading && (
            <div style={{ display: "contents" }}>
              <span class="loader"></span>
            </div>
          )}

          <div className="flex gap-4 flex-wrap justify-center">
            {!loading &&
              models &&
              models.map((model) => <Card key={model._id} model={model} />)}
          </div>

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
