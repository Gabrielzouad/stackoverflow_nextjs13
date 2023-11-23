import { Schema, model, Document, models } from 'mongoose';

interface IAnswer extends Document {
    question: Schema.Types.ObjectId;
    content: string;
    createdAt: Date;
    author: Schema.Types.ObjectId;
    downvotes: Schema.Types.ObjectId[];
    upvotes: Schema.Types.ObjectId[]
}

const answerSchema = new Schema<IAnswer>({
    question: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],

});

const Answer = models.Answer || model('Answer', answerSchema);

export default Answer;

