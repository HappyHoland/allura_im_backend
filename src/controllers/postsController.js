import fs from "fs"
import gerarDescricaoComGemini from "../services/geminiService.js";
import {getAllPosts, createPost, updatePostDB} from "../model/postsModel.js"

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

export async function updatePost(req,res) {
    const id = req.params.id
    const urlImg = `http://localhost:3000/${id}.png`

    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const alt = await gerarDescricaoComGemini(imgBuffer);

        const newPost = {
            descricao : req.body.descricao,
            imgUrl : urlImg,
            alt : alt
        };

        const updatedPost = await updatePostDB(id, newPost);

        res.status(200).json(updatedPost);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({error:"Failed to upload new post"});
    }
}