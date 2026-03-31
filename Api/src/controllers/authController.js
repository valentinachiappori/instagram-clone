import { mapUser, mapSimplePost } from "../dtos/dtos.js";
import { HEADER } from "../constants.js";

class AuthController {
    constructor(system, tokenController) {
        this.system = system;
        this.tokenController = tokenController;
    }

    login = (req, res) => {
        try {
            const { email, password } = req.body;

            const user = this.system.login(email, password);
            const posts = this.system.getPostByUserId(user.id);
            const token = this.tokenController.generateToken(user.id);

            res
                .header(HEADER, token)
                .json({
                    ...mapUser(user),
                    posts: posts.map(mapSimplePost)
                });

        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    };
}

export default AuthController;