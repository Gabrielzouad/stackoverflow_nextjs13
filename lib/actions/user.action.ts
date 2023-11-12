"use server"

import User from "../database/user.model"
import { connectToDatabase } from "../mongoose"

export async function getUserByID(params: any){
    try{
        // get the user from the database
        // return the user
        connectToDatabase()
        const { userId } = params
        const user = await User.findOne({ clerkId: userId })
        return user
    }
    catch(e){
        console.log(e)
        throw new Error("Error getting user")
    }
}