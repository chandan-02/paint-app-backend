const mongoose = require("mongoose");

require('dotenv').config()

module.exports = async () => {
  try {
    const conn = await mongoose.connect(
      `${process.env.MONGODB_CONNECTION_STRING}`,//connection string
      {
        useNewUrlParser: true,
      }
    );
    console.log(`Database Connected (${conn.connection.name}): ${conn.connection.host}`);
    return conn.connection.db;
  } catch (err) {
    console.log((`Error: ${err.message}`));
    console.log((`Database not Connected`));
  }
};
