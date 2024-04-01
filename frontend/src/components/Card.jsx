import React from "react";

const Card = ({ model }) => {
  
  const { firstname, lastname, picture, gender, dob, profession, height, weight } = model;

  return (
    <div className="max-w-[250px] bg-gray-200 rounded overflow-hidden shadow-lg">
      <img src={picture} alt={`${firstname} ${lastname}`} className="w-full" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{`${firstname} ${lastname}`}</div>
        <p className="text-gray-700 text-base">
          Gender: {gender}<br />
          Date of Birth: {new Date(dob).toLocaleDateString()}<br />
          Profession: {profession} <br />
          height: {height} <br />
          weight: {weight} <br />
        </p>
      </div>
    </div>
  );
};

export default Card;
