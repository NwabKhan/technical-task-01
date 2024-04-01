import React from "react";

// Define the type for the model object
interface Model {
  firstname: string;
  lastname: string;
  picture: string;
  gender: string;
  dob: string; // Assuming dob is a string in ISO format
  profession: string;
  height: number;
  weight: number;
}

// Define the props type for the Card component
interface CardProps {
  model: Model;
}

const Card: React.FC<CardProps> = ({ model }) => {
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
