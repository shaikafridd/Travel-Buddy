const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/project";

main()
  .then(() => {
    console.log("db-connected");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});

  // Fix: Spread 'obj', not 'Object'
  initdata.data = initdata.data.map((obj) => ({
    ...obj,
    owner: '69ee27e0d1047aed4494b98b'
  }));

  await Listing.insertMany(initdata.data);
  console.log("data was initialized");
};

// const initDB = async () => {
//   await Listing.deleteMany({});

//   await Listing.insertMany(initdata.data);
//   console.log("data saveed");
// }

initDB();
