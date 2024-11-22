import {getAllPosts, createPost} from "../model/postsModel.js"
import fs from "fs"

export async function listPosts(req,res) {
    const posts = await getAllPosts();

    res.status(200).json(posts);
}

export async function newPost(req,res) {
    const newPost = req.body;

    try {
        const createdPost = await createPost(newPost);
        res.status(200).json(createdPost);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({error:"Failed to upload new post"});
    }
}

export async function uploadImage(req,res) {
    const newPost = {
        descricao : "",
        imgUrl : req.file.originalname,
        alt : ""
    };

    try {
        const createdPost = await createPost(newPost);
        const updatedImg = `uploads/${createdPost.insertedId}.png`;
        fs.renameSync(req.file.path, updatedImg);
        res.status(200).json(createdPost);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({error:"Failed to upload new post"});
    }
}