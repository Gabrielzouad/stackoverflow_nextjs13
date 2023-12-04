import mongoose from 'mongoose';

let isConnected: boolean = false;

export const connectToDatabase = async () => {
    mongoose.set("strictQuery", true);
  if (!process.env.MONGODB_URL) {
    console.log('=> no database uri provided');
  }

  if (isConnected) {
    return
  }
  
  try {
    await mongoose.connect(process.env.MONGODB_URL!, 
      { dbName:"devOverFlow"})

      isConnected = true;
      console.log('=> using new database connection')
  } catch (error) {
    console.log('=> error while connecting with database:', error);
  }
}