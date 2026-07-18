const dotenv = require('dotenv');
dotenv.config();
const { GoogleGenAI } = require('@google/genai');
const {z} = require('zod')

const ai = new GoogleGenAI({
     apiKey: process.env.GEMINI_API_KEY
});

const interviewReportSchema = {
     type:"object" ,
     properties:{
          matchScore : {
               type:"number",
               description: "A score between 0 and 100 indicating how well the candidate's profile matches the job describe"
          },
          technicalQuestions : {
               type:"array" ,
               description:"Technical questions that can be asked in the interview along with their intention and how to answer them",
               items:{
                    type:"object",
                    properties:{
                         question:{
                              type:"string" , 
                              description : "The technical quesiton that can be asked in the interview"
                         },
                         intention:{
                              type:"string" ,
                              description: "The intention of the interviewer and the idea behind asking this question"
                         },
                         answer:{
                              type:"string" , 
                              description:"How to answer this question, what points to cover, what approach to take etc."
                         }
                    },
                    required:["question","intention","answer"]
               }
          },
          behavioralQuestions : {
               type:"array",
               description:"Behavioral questions that can be asked in the interview along with their intention and how to answer them",
               items:{
                    type:"object",
                    properties:{
                         question:{
                              type:"string" , 
                              description : "The technical question can be asked in the interview"
                         },
                         intention:{
                              type:"string",
                              description: "The intention of the interviewer and the idea behind asking this question"
                         },
                         answer:{
                              type:"string",
                              description: "How to answer this question, what points to cover, what approach to take etc."
                         }
                    },
                    required:["question","intention","answer"]
               }
          } , 
          skillGaps : {
               type:"array",
               description : "List of skill gaps in the candidate's profile along with their severity",
               items:{
                    type:"object",
                    properties:{
                         skillName:{
                              type:"string",
                              description: "The skill which the candidate is lacking or need to improve"
                         },
                         severity:{
                              type:"string",
                              enum:["low","medium","high"],
                              description: "The severity of the skill gap ,  i.e. how important is this skill for the job and how much it can impact the candidate's chances"
                         }
                    },
                    required:["skillName","severity"]  
               }

          } , 
          preparationPlan : {
               type:"array",
               description:"A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively",
               items:{
                    type:"object",
                    properties:{
                         day:{
                              type:"number",
                              description:"The day number in the preparation plan, starting from 1"
                         },
                         focus:{
                              type:"string",
                              description:"The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."
                         },
                         task:{
                              type:"array",
                              description:"List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.",
                              items:{
                                   type:"string"
                              }
                         }
                    },
                    required:["day","focus","task"]    
               }
          },
          title : {
               type:"string",
               description:"The title of the interview report, e.g. Technical Interview Report for Full Stack Developer"
          }
     },
     required : ["title","matchScore","technicalQuestions","behavioralQuestions","skillGaps","preparationPlan"]
}

const ReportSchema = z.fromJSONSchema(interviewReportSchema)



const generateInterviewReport = async({resume , selfDescription , jobDescription})=>{

     const prompt = `
          You are an AI Interview Preparation Assistant. 
          Your task is to analyze the candidate's resume and the job description and generate a comprehensive interview preparation report. 
          The report should include technical questions, behavioral questions, skill gaps, and a preparation plan.

          Here is the candidate's resume:
          ${resume}

          Here is the job description:
          ${jobDescription}

          Here is the self description:
          ${selfDescription}

          Now, generate the interview preparation report in the format specified by the Zod schema.

          Make sure to include: 
          - Technical questions that can be asked in the interview along with their intention and how to answer them
          - Behavioral questions that can be asked in the interview along with their intention and how to answer them
          - Skill gaps in the candidate's profile along with their severity
          - A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively
          - The match score between the candidate's resume and the job description, i.e. how well the candidate's profile matches the job description, this score should be between 0 and 100 with 0 being no match and 100 being a perfect match
          - The title of the interview report, e.g. Technical Interview Report for Full Stack Developer

          The response should be in JSON format and should strictly follow the Zod schema.

          Remember, the goal is to help the candidate prepare for the interview effectively.

          Return ONLY valid JSON.
          Do not wrap the response in \`\`\`"json" or any markdown.
          Do not include any explanation.

          Your response should strictly be a valid JSON object conforming to the provided schema. No additional text, explanations, or markdown formatting should be included.
          `;

     const response = await ai.interactions.create(
          {
               model: "gemini-3.5-flash",
               input: prompt,
               response_format: 
               {
                    type: 'text',
                    mime_type: 'application/json',
                    schema: interviewReportSchema
               },
          }
     );
     

     const Report = ReportSchema.parse(JSON.parse(response.output_text));
     return Report;
}

module.exports = generateInterviewReport;