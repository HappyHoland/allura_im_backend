import connectToDB from "../config/dbConfig.js";

const connection = await connectToDB(process.env.MONGODB_CONNECTION_STRING);

export default function getAllPosts() {
    const db = connection.db("imersao-instabytes")
    
    const collection = db.collection("posts")

    return collection.find().toArray();
}