import { userDTO, userTimelineDTO } from "../schemas/dtos.js";

class UserController {
    constructor(system) {
        this.system = system;
    }

    getUserTimeline = (req, res) => {
        try {
            const user = req.user;
            const timeline = this.system.timeline(user.id);

            res.json(userTimelineDTO(user, timeline));
        } catch (e) {
            res.status(401).json({ error: e.message });
        }
    };

    getUser = (req, res) => {
        try {
            const userId = req.params.userId;
            const user = this.system.getUser(userId);
            const posts = this.system.getPostByUserId(user.id);

            res.json(userDTO(user, posts));
        } catch (e) {
            res.status(404).json({ error: e.message });
        }
    };

    putFollow = (req, res) => {
        try {
            const friendId = req.params.userId;
            const user_id = req.user.id;
            if (user_id === friendId) {
                return res.status(400).json({ error: "Can't add yourself as a friend" });
            }
            const user_update = this.system.updateFollower(user_id, friendId);
            const posts = this.system.getPostByUserId(user_id);
            res.json(userDTO(user_update, posts));
        } catch (e){
            res.status(404).json({ error: e.message });
        }

    }
}

export default UserController;