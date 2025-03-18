import slugify from "slugify";

export const generateSlug = async (title, model) => {
    let slug = slugify(title, {
        lower: true,
        strict: true,
        trim: true
    })

    let uniqueSlug = slug
    let count = 1

    while (await model.findFirst({where: {slug: uniqueSlug}})) {
        uniqueSlug = `${slug}-${count}`
        count++
    }

    return uniqueSlug
}