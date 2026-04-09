import { simpleUserDTO, simplePostDTO, } from "../schemas/dtos.js";

class SearchController {
    constructor(system,) {
        this.system = system;
    }

    search = (req, res) => {
        const text = req.query.query;
        const res_users = this.system.searchByName(text)
        const res_posts = this.system.searchByTag(text)

        res
            .json({
                users: res_users.map(simpleUserDTO),
                posts: res_posts.map(simplePostDTO)
            });
    }
}

export default SearchController;