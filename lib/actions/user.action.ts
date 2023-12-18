"use server"

import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";
import User from "../database/user.model";
import { connectToDatabase } from "../mongoose"
import { CreateUserParams, DeleteUserParams, GetAllUsersParams, GetSavedQuestionsParams, GetUserByIdParams, GetUserStatsParams, UpdateUserParams } from "./shared.types";
import Question from "../database/question.model";
import Tag from "../database/tag.model";
import Answer from "../database/answer.model";

export async function getUserByID(params: GetUserByIdParams) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(userParam: CreateUserParams) {
  try {
    connectToDatabase();

    const newUser = await User.create(userParam);
    return newUser
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();

    const {clerkId, updateData, path} = params

    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    revalidatePath(path);
    
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDatabase();

    const { clerkId } = params

    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    // delete user from database, questions answers comments etc.

    // const userQuesitionIds = await Question.find({ author: user._id }).distinct("_id");

    await Question.deleteMany({ author: user._id });

    // TODO: delete answers, comments, interactions, etc.

    const deleteUser = await User.findByIdAndDelete(user._id);
    
    return deleteUser;    
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllUsers(params: GetAllUsersParams){
  try{
      connectToDatabase()

       const { searchQuery, filter, page = 1, pageSize = 10 } = params
        const skipAmount = (page - 1) * pageSize

       let sortOptions = {}

       switch(filter){
         case "new_users":
           sortOptions = { joinedAt: -1 }
           break;
         case "old_users":
           sortOptions = { joinedAt: 1 }
           break;
         case "top_contributors":
            sortOptions = { reputation: -1 }
            break;
         default:
            break;
       }

       const query: FilterQuery<typeof User> = {}

       if(searchQuery){
          query.$or = [
            { name: { $regex: new RegExp(searchQuery, "i" )}},
            { username: { $regex: new RegExp(searchQuery, "i" )}}
          ]
        }
      const users = await User.find(query).sort(sortOptions).skip(skipAmount).limit(pageSize)

      const totalUsers = await User.countDocuments(query)
      const isNext = totalUsers > skipAmount + users.length

      return { users, isNext}
  }
  catch(e){
      console.log(e)
      throw new Error("Error getting users")
  }
}

export async function getSavedQuestions(params: GetSavedQuestionsParams) {
  try {
    const { clerkId, searchQuery, filter, page = 1, pageSize = 20} = params;
    const skipAmount = (page - 1) * pageSize

    const query: FilterQuery<typeof Question> = searchQuery 
    ? { title : { $regex: new RegExp(searchQuery, "i") } } 
    : { } 

    let sortOptions = {}

       switch(filter){
         case "most_recent":
           sortOptions = { createdAt: -1 }
           break;
         case "oldest":
           sortOptions = { createdAt: 1 }
           break;
         case "most_voted":
            sortOptions = { upvotes: -1 }
            break;
          case "most_viewed":
            sortOptions = { views: -1 }
            break;
          case "most_answered":
            sortOptions = { answers: -1 }
            break;
         default:
            break;
       }

       

    const user = await User.findOne({ clerkId })
      .populate({
        path: "saved",
        match: query,
        options: {
          sort: sortOptions,
          skip: skipAmount,
          limit: pageSize + 1},
        populate: [
          { path: "tags", model:Tag, select: "_id name" },
          { path: "author", model: User, select: "_id clerkId name picture" }
        ]
      })
     
      
      const isNext = user.saved.length > pageSize

    if (!user) {
      throw new Error("User not found");
    }

    const questions = user.saved;

    return { questions, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserInfo(params: GetUserByIdParams) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      throw new Error("User not found");
    }

    const totalQuestions = await Question.countDocuments({ author: user._id });
    const totalAnswers = await Answer.countDocuments({ author: user._id });


    return { user, totalQuestions, totalAnswers };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserQuestions(params: GetUserStatsParams) {
  try {
    const { userId, page = 1, pageSize = 10} = params;
    const skipAmount = (page - 1) * pageSize

    const totalQuestions = await Question.countDocuments({ author: userId})

    const userQuestions = await Question.find({ author: userId})
    .sort({ views: -1, upvotes: -1})
    .skip(skipAmount)
    .limit(pageSize + 1)
    .populate("tags", "_id name")
    .populate("author", "_id clerkId name picture")

    const isNext = totalQuestions > skipAmount + userQuestions.length

    return { totalQuestions, questions: userQuestions, isNext };

  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserAnswers(params: GetUserStatsParams) {
  try {
    const { userId, page = 1, pageSize = 20 } = params;
    const skipAmount = (page - 1) * pageSize

    const totalAnswers = await Answer.countDocuments({ author: userId})

    const userAnswers = await Answer.find({ author: userId})
    .sort({ upvotes: -1})
    .skip(skipAmount)
    .limit(pageSize)
    .populate("author", "_id clerkId name picture")
    .populate("question", "_id title")

    const isNext = totalAnswers > skipAmount + userAnswers.length

    return { totalAnswers, answers: userAnswers, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}


