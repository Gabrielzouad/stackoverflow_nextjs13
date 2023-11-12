"use server"

import Question from "../database/question.model"
import Tag from "../database/tag.model"
import { connectToDatabase } from "../mongoose"

export async function createQuestion(params: any){
    try{
        connectToDatabase()

        const { title, content, tags, author, path } = params
        
        // create the question
        const question = await Question.create({
            title,
            content,
            author,
        })

        const tagDocuments = []

        // Create tags or get them if they exist
        for(const tag of tags){
            const existingTag = await Tag.findOneAndUpdate(
                { name: {$regex: new RegExp(`^${tag}$`, "i")} },
                { $setOnInsert: { name: tag }, $push: { questions: question._id }},
                { upsert: true, new: true })
            tagDocuments.push(existingTag._id)
        }

        await question.findOneAndUpdate(question._id, { tags: { $each: tagDocuments} })

        // create an interaction record for the users ask_question action
        // increment author's reputation by 5 for creating a question
    }
    catch(e){
    }
}