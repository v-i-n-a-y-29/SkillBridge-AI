const pdfParse = require('pdf-parse')
const generateInterviewReport = require('../service/ai.service')
const interviewReportModel = require('../models/interviewReport.model')


/**
 * @description Controller to generate interview report based on user self description, resume and job description.
 */

async function generateInterviewReportController(req , res) {
    try {

        const resumeFile = req.file

        const {selfDescription , jobDescription}  = req.body

        
        const pdfData = await pdfParse(resumeFile.buffer);
        const resumeText = pdfData.text;

        const interviewReportAi = await generateInterviewReport({resume:resumeText , selfDescription , jobDescription})


        const Report = await interviewReportModel.create({
             user:req.data.id,
             resume:resumeText,
             selfDescription:selfDescription,
             jobDescription:jobDescription,
             ...interviewReportAi
        })
        
        return res.status(201).json({
             success:true,
             message:"Interview report generated successfully",
             report:Report
        })

    } catch (error) {
        return res.status(500).json({
             success:false,
             message:"Failed to generate interview report",
             error:error.message
        })
    }
}


/**
 * @description Controller to get interview report based on interview id.
 */

async function getInterviewReportByIdController(req , res) {
    try {

        const {interviewId} = req.params
        const userId = req.data.id

        const Report = await interviewReportModel.findOne({_id:interviewId , user:userId})

        if(!Report){
            return res.status(404).json({
                 success:false,
                 message:"Interview report not found",
                 error:error.message
            })
        }
        return res.status(200).json({
             success:true,
             message:"Interview report fetched successfully",
             report:Report
        })

    } catch (error) {
        return res.status(500).json({
             success:false,
             message:"Failed to fetch interview report",
             error:error.message
        })
    }
}

/**
 * @description Controller to get all interview reports of a user.
 */

async function getAllInterviewReportsController(req , res) {
    try {

        const userId = req.data.id

        const Reports = await interviewReportModel.find({user:userId}).sort({createdAt:-1}).select('title')

        return res.status(200).json({
             success:true,
             message:"Interview reports fetched successfully",
             reports:Reports
        })

    } catch (error) {
        return res.status(500).json({
             success:false,
             message:"Failed to fetch interview reports",
             error:error.message
        })
    }
}

module.exports = {generateInterviewReportController , getInterviewReportByIdController , getAllInterviewReportsController}