import { simpleUserDTO, simplePostDTO,  } from "../schemas/dtos.js";

class SearchController{
    constructor(system,) {
        this.system = system;
    }

    search = (req, res) => {
        try {
                const text = req.query.text;
                console.log(text)
                const res_users = this.system.searchByName(text)
                console.log(res_users)
                const res_posts = this.system.searchByUserName(text)
                console.log(res_posts)
                

                

                res
                    .json({
                        users: res_users.map(simpleUserDTO),
                        posts: res_posts.map(simplePostDTO)
                    });
    
            } catch (e) {
                res.status(400).json({ error: e.message });
            }
    }
}

export default SearchController;