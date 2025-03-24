import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";


export const connectDB = async () => {       // this is the function that will help to connect to the database and it is an async function.
    try {
       const conn = await mongoose.connect(ENV_VARS.MONGO_URI)  // this is the connection string that we are using to connect to the database
       console.log(`MongoDB connected: ` + conn.connection.host);  // this will print the message if the connection is successful and if we fail then it will go to the catch block
    } catch (error) {
        console.error(`Error connecting to MONGODB: ` + error.message);  // this will print the error message if the connection is not successful
        process.exit(1);  // 1 means that there is an error and 0 means success
    }
}