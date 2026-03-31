import { userDTO, simplePostDTO } from "../schemas/dtos.js";
import { draftUser } from "../schemas/draft.js";
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
                    ...userDTO(user),
                    posts: posts.map(simplePostDTO)
                });

        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    };
    register = (req, res) => {
        try {
            const { name, email, password, image } = req.body;
            const newUser = this.system.register(draftUser(email, password, name, image));
            const token = this.tokenController.generateToken(newUser);

            return res
                    .header(HEADER, token)
                    .json({ ...userDTO(newUser), post : [] });
                } catch (e) {
                  res.status(400).json({ error: e.message });
        }
    };
}
    
export default AuthController;