import { userDTO, simplePostDTO } from "../schemas/dtos.js";

class UserController {
    constructor(system) {
        this.system = system;
    }

    getUser = (req, res) => {
        try {
            const userId = req.params.userId;
            const user = this.system.getUser(userId);
            const posts = this.system.getPostByUserId(user.id);

            res.json({
                ...userDTO(user),
                posts: posts.map(simplePostDTO)
            });
        } catch (e) {
            res.status(404).json({ error: e.message });
        }
    };
}

export default UserController;