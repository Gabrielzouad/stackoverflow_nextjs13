"use server"

import Tag from "../database/tag.model"
import User from "../database/user.model"
import { connectToDatabase } from "../mongoose"
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.types"

export async function getTopInteractedTags(params: GetTopInteractedTagsParams){
    try{
        connectToDatabase()
        const { userId } = params
        const user = await User.findById(userId)

        if(!user){
            throw new Error("User not found")
        }

        // Find interactions for the user and sort by tags

        // interaction...

        return [{_id: "1", name: "tag1"}, {_id: "2", name: "tag2"},{_id: "3", name: "tag3"}]
    }
    catch(e){
        console.log(e)
        throw new Error("Error getting tags")
    }
  }

export async function getTags(params: GetAllTagsParams){
    try{
        connectToDatabase()

        const tags = await Tag.find({})
    
        return { tags }
    }
    catch(e){
        console.log(e)
        throw new Error("Error getting questions")
    }
}
  