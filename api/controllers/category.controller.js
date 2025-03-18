import db from "../libs/db.js";


export const controller_name = async (req, res) => {
    try {
        //codes
    }catch (err) {
        res.status(500).json({serverError: `Something goes wrong ${err}`})
    }
}

export const all_categories = async (req, res) => {
    try {
        const categories = await db.category.findMany()

        res.status(200).json(categories)
    }catch (err) {
        res.status(500).json({serverError: `Something goes wrong ${err}`})
    }
}

export const home_categories = async (req, res) => {
    try {
        const categories = await db.category.findMany({
            take: 8
        })

        res.status(200).json(categories)
    }catch (err) {
        res.status(500).json({serverError: `Something goes wrong ${err}`})
    }
}

export const footer_categories = async (req, res) => {
    try {
        const categories = await db.category.findMany({
            take: 4
        })

        res.status(200).json(categories)
    }catch (err) {
        res.status(500).json({serverError: `Something goes wrong ${err}`})
    }
}