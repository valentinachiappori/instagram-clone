export const draftUser = (email,password, name, image) => {
    return {
        name: name,
        email: email,
        password: password,
        image: image,
    }
}

export const draftPost = (text, image) => {
    return {
        description: text,
        image: image,
    }
}

export const draftComment = (text) => {
    return {
        body: text,
    }
}