import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    mongoose.connect(process.env.DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log("DB Online");
  } catch (error) {
    throw new Error("Database connection error.");
  }
};
