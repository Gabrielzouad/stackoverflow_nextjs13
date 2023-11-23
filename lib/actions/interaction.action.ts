"use server"

import Interaction from "../database/interaction.model"
import { ViewQuestionParams } from "./shared.types"
import { connectToDatabase } from "../mongoose"
import Question from "../database/question.model"


export async function viewQuestion(params: ViewQuestionParams) {
    try {
      await connectToDatabase()
       
        const { userId, questionId } = params

        // update view  count for question
        await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } })

        if(userId){
        const existingInteraction = await Interaction.findOne({ user: userId, action : "view", question: questionId })
        

        if (!existingInteraction) {
            // create new interaction
            const interaction = new Interaction({
                user: userId,
                action: "view",
                question: questionId
            })

            await interaction.save()
        }
    }}
    catch (err) {
        console.log(err)
    }


    
}