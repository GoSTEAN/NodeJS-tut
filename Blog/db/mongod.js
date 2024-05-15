const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const dbURL =
  "mongodb+srv://badviruscoder:NLzLRW1iiI52iAr9@bloggy.4gv4jur.mongodb.net/Bloggy?retryWrites=true&w=majority";

const connect = mongoose.connection;
mongoose.set("strictQuery", true);
const connectDB = async () => {
  connect.on("connected", async () => {
    console.log("MongoDB Connection Established");
  });

  connect.on("reconnected", async () => {
    console.log("MongoDB Connection Reestablished");
  });

  connect.on("disconnected", () => {
    console.log("Mongo Connection Disconnected");
    console.log("Trying to reconnect to Mongo ...");

    setTimeout(() => {
      mongoose.connect(dbURL, {
        keepAlive: true,
        socketTimeoutMS: 3000,
        connectTimeoutMS: 3000,
      });
    }, 3000);
  });

  connect.on("close", () => {
    console.log("Mongo Connection Closed");
  });
  connect.on("error", (error) => {
    console.log("Mongo Connection ERROR: " + error);
  });

  await mongoose
    .connect(dbURL, {
    })
    .catch((error) => console.log(error));
};

module.exports = { connectDB, connect };

