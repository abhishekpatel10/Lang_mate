import mogoose from "mongoose";
export const connectDB = async () => {
    try {
        const conn = await mogoose.connect(process.env.MONGODB_URI);
        console.log(`Database connected : ${conn.connection.host}`);
    } catch (error) {
        console.log("Error connecting to database:",error);
        process.exit(1);
    }
}