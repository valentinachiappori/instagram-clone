import { draftPost, draftComment } from "../schemas/draft.js";
import { simplePostDTO } from "../schemas/dtos.js";


class PostController {
    constructor(system) {
        this.system = system;
    }

    createPost = (req, res) => {
        try {
            const { description, image} = req.body;
            const userId = req.user.id;
            const postToCreate = draftPost(description, image);

            const newPost = this.system.addPost(userId, postToCreate);

            res.json(simplePostDTO(newPost));
        } catch (e) {
            res.status(401).json({ error: e.message });
        }
    };

    updateLike = (req, res) => {
        try {
            const userId = req.user.id;
            const postId = req.params.postId;

            const updatePost = this.system.updateLike(postId, userId);

            res.json(simplePostDTO(updatePost));
        } catch (e) {
            res.status(404).json({ error: e.message });
        }
    };

    addComment = (req, res) => {
        try {
            const { body} = req.body;
            const userId = req.user.id;
            const postId = req.params.postId;
            const comment = draftComment(body);

            const updatePost = this.system.addComment(postId, userId, comment);

            res.json(simplePostDTO(updatePost));
        } catch (e) {
            res.status(404).json({ error: e.message });
        }
    };

    getPost = (req, res) => {
        try {
            const postId = req.params.postId;
            const post = this.system.getPost(postId);
            
            res.json(simplePostDTO(post));
        } catch (e) {
            res.status(404).json({ error: e.message });
        }
    };

    updatePost = (req, res) => {
        try {
            const postId = req.params.postId;
            const userId = req.user.id;
            const post = this.system.getPost(postId);
            if (post.user.id !== userId) {
                return res.status(403).json({ error: "User is not the owner of the post" });
            }
            const updatedData = req.body; 
            
            const updatedPost = this.system.editPost(postId, updatedData);
            
            res.json(simplePostDTO(updatedPost));
        } catch (e) {
            res.status(404).json({ error: e.message });
        }
    };

    deletePost = (req, res) => {
        try {
            const postId = req.params.postId;
            const userId = req.user.id;
            const post = this.system.getPost(postId);
            if (post.user.id !== userId) {
                return res.status(403).json({ error: "User is not the owner of the post" });
            }
            this.system.deletePost(postId);
            
            res.status(204).send();
        } catch (e) {
            res.status(404).json({ error: e.message });
        }
    };

}

export default PostController;