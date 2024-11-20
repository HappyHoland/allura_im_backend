import {MongoClient} from "mongodb";

export default async function connectToDB(connectionString) {
    let client;

    try {
        client = new MongoClient(connectionString);
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        return client;

    } catch (erro) {
        console.error("Failed to connect to database!", erro);

    }
}