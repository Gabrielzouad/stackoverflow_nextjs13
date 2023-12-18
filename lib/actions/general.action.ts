"use server"

import Answer from "../database/answer.model";
import Question from "../database/question.model";
import Tag from "../database/tag.model";
import User from "../database/user.model";
import { connectToDatabase } from "../mongoose";
import { SearchParams } from "./shared.types";

const SearchableTypes = ["question", "user", "answer", "tag"];

export async function globalSearch (params: SearchParams){

    try{
        await connectToDatabase();

        const { query, type } = params;
        const regexQuery = { $regex: query, $options: "i" };

        let results = [];

        const modelsAndTypes = [
            { model: Question, searchField: "title", type: "question" },
            { model: User, searchField: "name", type: "user" },
            { model: Answer, searchField: "content", type: "answer" },
            { model: Tag, searchField: "name", type: "tag" },
        ];

        const typeLower = type?.toLowerCase();

       if(!typeLower || !SearchableTypes.includes(typeLower)){
            // Search all types
            for (const { model, searchField, type } of modelsAndTypes){
                const queryResult = await model
                .find({ [searchField]: regexQuery })
                .limit(2);

                results.push(...queryResult.map((item) => ({
                    title: type === "answer"
                    ? `Answers containing ${query}`
                    : item[searchField],
                    type,
                    id: type === "user"
                    ? item.clerkid
                    : type === "answer"
                    ? item.question
                    : item._id,
                })));
            }
       }else {
        // Search only the type specified
        const modelInfo = modelsAndTypes.find((item) => item.type === type);
        if(!modelInfo){
            throw new Error("Invalid type");
        }
        const queryResult = await modelInfo.model
        .find({ [modelInfo.searchField]: regexQuery })
        .limit(8)

        results = queryResult.map((item) => ({
            title: type === "answer" 
            ? `Answers containing ${query}` 
            : item[modelInfo.searchField],
            type,
            id: type === "user"
            ? item.clerkid
            : type === "answer"
            ? item.question
            : item._id,
        }));
       }

       return JSON.stringify(results);
    } catch(err){
        console.log(err);
    }
}