const mongoose = require("mongoose");


/**
 * -job description : String
 * -resume text : String
 * -self description : String
 * 
 * -matchScore : Number
 * 
 * -Technical questions : [{
 *           question:String , 
 *           intention : String , 
 *           answer : String
 *         }]
 * - behavioral questions : [{
 *          qustions:String,
 *          intention:String,
 *          answer:String
 *                  }]
 * -skill gaps : [{
 *            skillName:String,
 *            severity:{
 *              type:String , 
 *               enum:['low','medium','high']
 *            },
 *         }]
 * -prepration plan : [{
 *            day:Number,
 *            focus:String,
 *            task:[String]
 *          }]
 * 
 */

const interviewReportSchema = new mongoose.Schema({
     user:{
          type:mongoose.Schema.Types.ObjectId,
          ref:'users'
     },
     title:{
          type:String,
          required:[true , 'title is required']
     },
     jobDescription: {
          type: String,
          required: [true , 'jd is required']
     },
     resume: {
          type: String,
     },
     selfDescription: {
          type: String,
     },
     matchScore: {
          type: Number,
          min:0,
          max:100
     },
     technicalQuestions: [{
          question: {
               type: String,
               required: true 
          },
          intention: {
               type: String,
               required: true
          },
          answer: {
               type: String,
               required: true
          }
     }],
     behavioralQuestions: [{
          question: {
               type: String,
               required: true
          },
          intention: {
               type: String,
               required: true
          },
          answer: {
               type: String,
               required: true
          }
     }],
     skillGaps: [{
          skillName: {
               type: String,
               required: true
          },
          severity: {
               type: String,
               enum: ['low', 'medium', 'high'],
               required: true
          }
     }],
     preparationPlan: [{
          day: {
               type: Number,
               required: true
          },
          focus: {
               type: String,
               required: true
          },
          task: [{
               type: String,
               required: true
          }]
     }]
},{timestamps:true})


module.exports = mongoose.model("InterviewReport", interviewReportSchema);