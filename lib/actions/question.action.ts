"use server"

import Question from "../database/question.model"
import Tag, { ITag } from "../database/tag.model"
import { connectToDatabase } from "../mongoose"
import { revalidatePath } from "next/cache";
import { CreateQuestionParams, DeleteQuestionParams, EditQuestionParams, GetQuestionByIdParams, GetQuestionsByTagIdParams, GetQuestionsParams, QuestionVoteParams, ToggleSaveQuestionParams } from "./shared.types";
import User from "../database/user.model";
import { FilterQuery } from "mongoose";
import Answer from "../database/answer.model";
import Interaction from "../database/interaction.model";

export async function getQuestions(params: GetQuestionsParams){
    try{
        connectToDatabase()

        const questions = await Question.find({})
        .populate({path: "tags", model: Tag})
        .populate({path: "author", model: User})
        .sort({createdAt: -1})

        return { questions }
    }
    catch(e){
        console.log(e)
        throw new Error("Error getting questions")
    }
}

export async function getQuestionByID(params: GetQuestionByIdParams) {
  try {
    connectToDatabase();

    const { questionId } = params;

    const question = await Question.findById(questionId)
    .populate({ path: "tags", model: Tag, select: "_id name" })
    .populate({ path: "author", model: User, select: " _id clerkId name picture" });

    return question;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createQuestion(params: CreateQuestionParams) {
    try {
      connectToDatabase();
  
      const { title, content, tags, author, path } = params;
  
      // Create the question
      const question = await Question.create({
        title,
        content,
        author
      });
  
      const tagDocuments = [];
  
      // Create the tags or get them if they already exist
      for (const tag of tags) {
        const existingTag = await Tag.findOneAndUpdate(
          { name: { $regex: new RegExp(`^${tag}$`, "i") } }, 
          { $setOnInsert: { name: tag }, $push: { questions: question._id } },
          { upsert: true, new: true }
        )
  
        tagDocuments.push(existingTag._id);
      }
  
      await Question.findByIdAndUpdate(question._id, {
        $push: { tags: { $each: tagDocuments }}
      });
  
      // Create an interaction record for the user's ask_question action
      
      // Increment author's reputation by +5 for creating a question

      revalidatePath(path);
    } catch (error) {
      
    }
}

export async function upvoteQuestion(params: QuestionVoteParams) {
    try {
      connectToDatabase();
      const { userId, questionId, hasupVoted, hasdownVoted, path} = params;
  
      let updateQuery = {};

      if(hasupVoted){
        updateQuery = { $pull: { upvotes: userId }}
      }else if(hasdownVoted){
          updateQuery = { 
            $pull: { downvotes: userId },
            $push: { upvotes: userId } 
          }
        } else {
          updateQuery = { $addToSet: { upvotes: userId } }
        }

        const question = await Question.findByIdAndUpdate(questionId, updateQuery, { new: true })

        if(!question){
          throw new Error("Question not found")
        }
        revalidatePath(path)
        // Increment author's reputation by +10 for upvoting a question
    } catch (error) {
      console.error(error);
    }
}

export async function downvoteQuestion(params: QuestionVoteParams) {
  try {
    connectToDatabase();
    const { userId, questionId, hasdownVoted, path} = params;

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

      const question = await Question.findByIdAndUpdate(questionId, updateQuery, { new: true })

      if(!question){
        throw new Error("Question not found")
      }
      revalidatePath(path)
      // Increment author's reputation by +10 for upvoting a question
  } catch (error) {
    console.error(error);
  }
}

export async function toggleSaveQuestion(params: ToggleSaveQuestionParams) {
  try {
    connectToDatabase();

    const { userId, questionId, path } = params;

    const user = await User.findById(userId);

    if(!user) {
      throw new Error('User not found');
    }

    const isQuestionSaved = user.saved.includes(questionId);

    if(isQuestionSaved) {
      // remove question from saved
      await User.findByIdAndUpdate(userId, 
        { $pull: { saved: questionId }},
        { new: true }
      )
    } else {
      // add question to saved
      await User.findByIdAndUpdate(userId, 
        { $addToSet: { saved: questionId }},
        { new: true }
      )
    }

    revalidatePath(path)
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionsByTag(params: GetQuestionsByTagIdParams) {
  try{
    connectToDatabase()
  const { tagId, searchQuery } = params;

  const tagFilter: FilterQuery<ITag> = { _id: tagId}

  const tag = await Tag.findOne(tagFilter)
    .populate({
      path: "questions",
      model: Question,
      match: searchQuery 
      ? { title : { $regex: searchQuery, $option: "i"}} 
      : {},
      options: { 
        sort: { createdAt: -1 } 
      },
      populate: [
        { path: "tags", model:Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" }
      ]
    })

  if (!tag) {
    throw new Error("tag not found");
  }

  const questions = tag.questions

  return { tagTitle : tag.name, questions };
} catch (error) {
  console.log(error);
  throw error;
}
}


export async function deleteQuestion(params: DeleteQuestionParams){
  try{
    connectToDatabase()
    const { questionId, path } = params

    await Question.deleteOne({ _id: questionId })
    await Answer.deleteMany({ question: questionId })
    await Interaction.deleteMany({ question: questionId })
    await Tag.updateMany({ questions: questionId }, { $pull: { questions: questionId }})

    revalidatePath(path)

  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function editQuestion(params: EditQuestionParams){
  try{
    connectToDatabase()
    const { questionId, title, content, path } = params
    
    const question = await Question.findById(questionId).populate("tags")

    if(!question){
      throw new Error("Question not found")
    }
    question.title = title
    question.content = content

    await question.save()
    
    revalidatePath(path)
  }catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getHotQuestions (params: GetQuestionsParams){
  try{
    connectToDatabase()
    const questions = await Question.find({})
    .sort({views: -1, upvotes: -1})
    .limit(5)

    return { questions }
  }catch (error) {
    console.log(error);
    throw error;
  }
}

