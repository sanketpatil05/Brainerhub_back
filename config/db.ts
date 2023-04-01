import mongoose, { Connection } from "mongoose";

mongoose.set("strictQuery", false);

async function connect(): Promise<Connection> {
  await mongoose.connect(
    "mongodb+srv://sanketp441:sanket123@cluster0.rttiys7.mongodb.net/brainhub"
  );

  const connection: Connection = mongoose.connection;
  return connection;
}

export { connect };
