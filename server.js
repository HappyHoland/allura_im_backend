import express from "express";

const posts = [
    {id: 1, desc: "descrição A - AAA", img: "sample1.png"},
    {id: 2, desc: "descrição B - BBB", img: "sample2.png"},
    {id: 3, desc: "descrição C - CCC", img: "sample3.png"},
];

const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log("Servidor escutando...");
});

function getPostById(id) {
    return posts.findIndex((post) => {
        return post.id === Number(id);
    });
}

app.get("/posts", (req,res) => {
    res.status(200).json(posts);
});

app.get("/posts/:id", (req, res) => {
    const index = getPostById(req.params.id);

    res.status(200).json(posts[index]);
})