import { simpleUserDTO, simplePostDTO,  } from "../schemas/dtos.js";

class SearchController{
    constructor(system,) {
        this.system = system;
        
    }

    search = (req, res) => {
        
        const text = req.query.text;
        const res_users = this.system.searchByName(text)
        const res_posts = this.system.searchByUserName(text)
        
        
        res
            .json({
                users: res_users.map(simpleUserDTO),
                posts: res_posts.map(simplePostDTO)
            });
    
  
    }
}

export default SearchController;