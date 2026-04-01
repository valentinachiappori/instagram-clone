import { draftPost } from "../schemas/draft.js";
import { simplePostDTO } from "../schemas/dtos.js";

class PostController {
    constructor(system) {
        this.system = system;
    }

    createPost = (req, res) => {
        try {
            const { text, image} = req.body;
            const userId = req.user.id;
            const postToCreate = draftPost(text, image);

            const newPost = this.system.addPost(userId, postToCreate);

            res.json(simplePostDTO(newPost));
        } catch (e) {
            res.status(404).json({ error: e.message });
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
}

export default PostController;