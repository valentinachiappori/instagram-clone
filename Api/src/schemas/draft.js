export const draftUser = (email,password, name, image) => {
    return {
        name: name,
        email: email,
        password: password,
        image: image,
    }
}