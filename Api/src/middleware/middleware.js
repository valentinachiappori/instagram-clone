import { register_schema, login_schema, update_post_schema, create_post_schema, comment_schema } from "../schemas/validations.js";

export const validate = (schema_name) => async (req, res, next) => {
    try {
        const schema = schemas_mapper[schema_name];

        await schema.validate(req.body, { abortEarly: false });
        next();
    } catch (e) {
        res.status(400).json({ errors: e.errors });
    }
};

const schemas_mapper = {
    "REGISTER": register_schema,
    "LOGIN": login_schema,
    "UPDATE_POST": update_post_schema,
    "CREATE_POST": create_post_schema,
    "COMMENT": comment_schema
};