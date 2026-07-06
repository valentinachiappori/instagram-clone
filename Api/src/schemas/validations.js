import { object, string } from "yup"

export const register_schema = object({
    name: string().required(),
    password: string().required().max(32, "La contraseña supera los 32 caracteres").min(5, "la contraseña tiene menos de 5 caracteres"),
    email: string().required("El email es obligatorio").email("El email no tiene un formato válido"),
    image: string().url().required("La imagen es obligatoria"),

})

export const login_schema = object({
    email: string().required("El email es obligatorio").email("El email no tiene un formato válido"),
    password: string().required(),
})

export const update_post_schema = object({
    description: string(),
    image: string().url("La imagen debe ser una URL válida")
});

export const create_post_schema = object({
    description: string().required("La descripción es obligatoria"),
    image: string().required("La imagen es obligatoria").url("La imagen debe ser una URL válida")
});

export const comment_schema = object({
    body: string().required("El comentario es obligatorio")
});