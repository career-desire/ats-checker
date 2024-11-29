//A schema defines the structure and data types of documents in a MongoDB collection, serving as a blueprint for creating and validating data.
import mongoose from "mongoose";

const resumeDetailsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  text: {
    checkList: {
      type: String,
      required: true,
    },
    matchingDetails: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    suggestions: {
      type: String,
      required: true,
    },
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

export const ResumeDetails = mongoose.model("ResumeDetails", resumeDetailsSchema);

export default ResumeDetails;