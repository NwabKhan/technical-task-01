import { faker } from '@faker-js/faker';
import Model from "./models/dataModel.model.js";

// Function to generate random data for the form fields
const generateRandomData = () => {
  const professions = ["commedian", "actor", "actress", "model"];
  const castings = ["movies", "commercials", "newspapers", "magazines"];
  const gender = ["male", "female"]

  return {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    picture: faker.image.url(),
    gender: faker.helpers.arrayElement(gender),
    dob:faker.date.between({ from: '1940-01-01T00:00:00.000Z', to: '2020-01-01T00:00:00.000Z' }),
    hairColor: faker.number.int({ min: 0, max: 200 }),
    profession: faker.helpers.arrayElement(professions),
    shoesize: faker.number.int({ min: 0, max: 50 }),
    hairLength: faker.number.int({ min: 0, max: 200 }),
    waistSize: faker.number.int({ min: 0, max: 100 }),
    height: faker.number.int({ min: 0, max: 250 }),
    weight: faker.number.int({ min: 0, max: 250 }),
    castings: faker.helpers.arrayElement(castings),
  };
};

// Populate the database with dummy records
const populateDB = async () => {
  console.log("Calling populateDB()")
  try {
    // Remove existing records
    await Model.deleteMany({});

    // Generate and save 50 dummy records
    const dummyRecords = [];
    for (let i = 0; i < 50; i++) {
      const formData = generateRandomData();
      dummyRecords.push(formData);
    }
    await Model.insertMany(dummyRecords);

    console.log("Database populated with dummy records.");
    process.exit(0); // Exit with success
  } catch (error) {
    console.error("Error populating database:", error);
    process.exit(1); // Exit with failure
  }
};

export default populateDB;
