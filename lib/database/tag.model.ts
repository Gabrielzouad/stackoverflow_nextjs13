import { Schema, models, model, Document } from 'mongoose';

export interface ITag extends Document {
    name: string;
    description: string;
    questions: Schema.Types.ObjectId[];
    createdOn: Date;
    followers: Schema.Types.ObjectId[];
}

const TagSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
    createdOn: { type: Date, default: Date.now },
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
})

const Tag = models.Tag || model<ITag>('Tag', TagSchema)

export default Tag