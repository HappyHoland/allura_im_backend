import "dotenv/config";
import { ObjectId } from "mongodb";
import connectToDB from "../config/dbConfig.js";

const connection = await connectToDB(process.env.MONGODB_CONNECTION_STRING);

export function getAllPosts() {
    const db = connection.db("imersao-instabytes");
    
    const collection = db.collection("posts");

    return collection.find().toArray();
}

export function createPost(newPost) {
    const db = connection.db("imersao-instabytes");
    
    const collection = db.collection("posts");

    return collection.insertOne(newPost);
}

export function updatePostDB(id, newPost) {
    const objId = ObjectId.createFromHexString(id);

    const db = connection.db("imersao-instabytes");
    
    const collection = db.collection("posts");

    return collection.updateOne({_id: new ObjectId(objId)}, {$set: newPost});
}