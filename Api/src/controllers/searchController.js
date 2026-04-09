import { simpleUserDTO, simplePostDTO, } from "../schemas/dtos.js";

class SearchController {
    constructor(system,) {
        this.system = system;
    }

    search = (req, res) => {
        const text = req.query.query;
        if (!text) {
            return res.status(400).json({ error: "El parámetro de búsqueda es obligatorio" });
        }
        const resUsers = this.system.searchByName(text)
        const resPosts = this.system.searchByTag(text)

        res
            .json({
                users: resUsers.map(simpleUserDTO),
                posts: resPosts.map(simplePostDTO)
            });
    }
}

export default SearchController;