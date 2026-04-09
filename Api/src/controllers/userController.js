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
            const userId = req.user.id;
            if (userId === friendId) {
                return res.status(400).json({ error: "Can't add yourself as a friend" });
            }
            const userUpdate = this.system.updateFollower(userId, friendId);
            const posts = this.system.getPostByUserId(userId);
            res.json(userDTO(userUpdate, posts));
        } catch (e){
            res.status(404).json({ error: e.message });
        }

    }
}

export default UserController;