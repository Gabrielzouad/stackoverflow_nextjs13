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

        const { searchQuery, filter, page = 1, pageSize = 20 } = params
        const skipAmount = (page - 1) * pageSize

        const query: FilterQuery<typeof Tag> = {};

        if(searchQuery) {
          query.$or = [{name: { $regex: new RegExp(searchQuery, 'i')}}]
        }

        let sortOptions = {}

        switch(filter){
            case "popular":
                sortOptions = { questions: -1 }
                break;
            case "recent":
                sortOptions = { createdAt: -1 }
                break;
            case "name":
                sortOptions = { name: 1 }
                break;
            case "old":
                sortOptions = { createdAt: 1 }
                break;

            default:
                break;
        }

        const tags = await Tag.find(query).sort(sortOptions).skip(skipAmount).limit(pageSize)

        const totalTags = await Tag.countDocuments(query)
        const isNext = totalTags > skipAmount + tags.length
    
        return { tags, isNext } 
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
  
  