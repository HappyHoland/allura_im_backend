import express from "express"
import multer from "multer"
import { listPosts, newPost, uploadImage } from "../controllers/postsController.js";

const upload = multer({dest:"./uploads"})

const routes = (app) => {
    app.use(express.json());

    app.get("/posts", listPosts);

    app.post("/posts", newPost);

    app.post("/upload", upload.single("imagem"), uploadImage)
}

export default routes;