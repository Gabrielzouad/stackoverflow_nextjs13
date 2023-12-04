"use server"

import Tag from "../database/tag.model"
import User from "../database/user.model"
import { connectToDatabase } from "../mongoose"
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.types"
import { FilterQuery } from "mongoose";


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

        const { searchQuery } = params
        const query: FilterQuery<typeof Tag> = {};

        if(searchQuery) {
          query.$or = [{name: { $regex: new RegExp(searchQuery, 'i')}}]
        }
        const tags = await Tag.find(query)
    
        return { tags } 
    }
    catch(e){
        console.log(e)
        throw new Error("Error getting questions")
    }
}

export async function getTopPopularTags(){
    try{
        connectToDatabase()

        const popularTags = await Tag.aggregate([
            { $project: { name: 1, count: { $size: "$questions" } } },
            { $sort: { count: -1 } },
            { $limit: 5 } ])

        return { popularTags }
    }
    catch(e){
        console.log(e)
        throw new Error("Error getting questions")
    }
}
  
  