"use server"


import Question from '../database/question.model';
import User from '../database/user.model';
import { QuestionVoteParams } from './shared.types';

// Upvote action
export async function upvote(params: QuestionVoteParams) {
  try {
    const { userId, questionId } = params;

    // Find the user by userId
    const user = await User.findById(userId);
    // Find the question by questionId
    const question = await Question.findById(questionId);

    // Add the user's upvote to the question
    question.upvotes.push(user);

    // Save the updated question
    await question.save();
  } catch (error) {
    console.error(error);
  }
}

// Downvote action
export async function downvote(params : QuestionVoteParams) {
  try {
    const { userId, questionId } = params

    // Find the user by userId
    const user = await User.findById(userId);
   
    // Find the question by questionId
    const question = await Question.findById(questionId);
    // Add the user's downvote to the question
    question.downvotes.push(user);

    // Save the updated question
    await question.save();
  } catch (error) {
    console.error(error);
  }
}
