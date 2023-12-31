"use server"

import { revalidatePath } from "next/cache";
import Answer from "../database/answer.model";
import { connectToDatabase } from "../mongoose";
import { AnswerVoteParams, CreateAnswerParams, DeleteAnswerParams, GetAnswersParams } from "./shared.types";
import Question from "../database/question.model";
import User from "../database/user.model";
import Interaction from "../database/interaction.model";

export async function createAnswer(params: CreateAnswerParams) {
    try {
      connectToDatabase();
  
        const { content, author, question, path } = params;
        const newAnswer = await Answer.create({ content, author, question });
      

        const questionObject = await Question.findByIdAndUpdate(question, { $push: { answers: newAnswer._id } })

        // create interaction for author
        await Interaction.create({ 
          user: author, 
          action: "answer", 
          question, 
          answer:newAnswer._id, 
          tags:questionObject.tags })

        // Increment author's reputation by +10 for answering a question
        await User.findByIdAndUpdate(author, { $inc: { reputation: 10 }})

        revalidatePath(path)
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

export async function getAnswers(params: GetAnswersParams) {
    try {
      connectToDatabase();

      const { questionId, sortBy, page = 1, pageSize = 20 } = params;
      const skipAmount = (page - 1) * pageSize

      let sortOptions = {}

      switch(sortBy){
        case "highestUpvotes":
          sortOptions = { upvotes: -1 }
          break;
        case "lowestUpvotes":
          sortOptions = { upvotes: 1 }
          break;
        case "recent":
          sortOptions = { createdAt: -1 }
          break;
        case "old":
          sortOptions = { createdAt: 1 }
          break;
        default:
          sortOptions = { createdAt: -1 }
      }
  
      const answers = await Answer.find({ question: questionId })
      .populate({ path: "author", model: User, select: " _id clerkId name picture" })
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize)

      const totalAnswers = await Answer.countDocuments({ question: questionId })
      const isNext = totalAnswers > skipAmount + answers.length
  
      return { answers, isNext };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

export async function upvoteAnswer(params: AnswerVoteParams) {
    try {
      connectToDatabase();
      const { userId, answerId, hasupVoted, hasdownVoted, path} = params;
  
      let updateQuery = {};

      if(hasupVoted){
        updateQuery = { $pull: { upvotes: answerId }}
      }else if(hasdownVoted){
          updateQuery = { 
            $pull: { downvotes: userId },
            $push: { upvotes: userId } 
          }
        } else {
          updateQuery = { $addToSet: { upvotes: userId } }
        }

        const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, { new: true })

        if(!answer){
          throw new Error("Answer not found")
        }
        revalidatePath(path)
        // Increment author's reputation by +2 for upvoting a answer
        await User.findByIdAndUpdate(userId, { $inc: { reputation: hasupVoted ? -2 : 2 }})

        // Increment author's reputation by +10 for recieving an upvote on an answer
        await User.findByIdAndUpdate(answer.author, { $inc: { reputation: hasupVoted ? -10 : 10 }})
    } catch (error) {
      console.error(error);
    }
}

export async function downvoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();
    const { userId, answerId, hasdownVoted, path} = params;

    let updateQuery = {};

    if(hasdownVoted){
      updateQuery = { $pull: { downvote: userId }}
    }else if(hasdownVoted){
        updateQuery = { 
          $pull: { upvotes: userId },
          $push: { downvote: userId } 
        }
      } else {
        updateQuery = { $addToSet: { downvotes: userId } }
      }

      const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, { new: true })

      if(!answer){
        throw new Error("Answer not found")
      }
      revalidatePath(path)
       // Increment author's reputation by +2 for upvoting a answer
       await User.findByIdAndUpdate(userId, { $inc: { reputation: hasdownVoted ? -2 : 2 }})

       // Increment author's reputation by +10 for recieving an upvote on an answer
       await User.findByIdAndUpdate(answer.author, { $inc: { reputation: hasdownVoted ? -10 : 10 }})
  } catch (error) {
    console.error(error);
  }
}

export async function deleteAnswer(params: DeleteAnswerParams){
  try{
    connectToDatabase()
    const { answerId, path } = params
    const answer = await Answer.findById(answerId)

    if(!answer){
      throw new Error("Answer not found")
    }

    await answer.deleteOne({_id: answerId})
    await Question.updateMany({ _id: answer.question }, { $pull: { answers: answerId }})
    await Interaction.deleteMany({ answer: answerId })

    revalidatePath(path)

  } catch (error) {
    console.log(error);
    throw error;
  }
}