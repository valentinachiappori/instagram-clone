import {object, string} from "yup"


export const register_schema = object({
    name : string().required(),
    password : string().required().max(32, "La contraseña supera los 32 caracteres").min(8,"la contraseña tiene menos de 8 caracteres"),
    email: string().required("El email es obligatorio").email("El email no tiene un formato válido"),
    image : string().url(),
    
})

export const login_schema = object({
    email: string().required("El email es obligatorio").email("El email no tiene un formato válido"),
    password : string().required().max(32, "La contraseña supera los 32 caracteres").min(8,"la contraseña tiene menos de 8 caracteres"),    
})