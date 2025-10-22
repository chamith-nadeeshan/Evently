"use server"

import { CreateCategoryParams } from "@/types"
import { handleError } from "../utils"
import { connect } from "http2"
import { connectToDatabase } from "../database"
import Category from "../database/models/category.model"

export const createCategory = async ({ categoryName }: CreateCategoryParams) => {
    try {
        // Create the category in the database.
        await connectToDatabase();
        
        const newCategory = await Category.create({ name: categoryName });

        return JSON.parse(JSON.stringify(newCategory));

    } catch (error) {
        handleError(error)
    }
}

export const getAllCategory = async () => {
    try {
        // Create the category in the database.
        await connectToDatabase();

        const categories = await Category.find();

        return JSON.parse(JSON.stringify(categories));

    } catch (error) {
        handleError(error)
    }
}