import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};
async function dbConnect(): Promise<void> {
  //Check If We've A Connection To The Database Or If It's Currently Connecting.
  if (connection.isConnected) {
    console.log("Already Connected To The Database");
    return;
  }

  try {
    //Attempt To Connect To The Database
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});
    connection.isConnected = db.connections[0].readyState;
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Database Connection Failed:", error);
    //Graceful Exit In Case Of A Connection Error.
    process.exit(1);
  }
}

export default dbConnect;
