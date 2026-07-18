const express = require('express')
const authMiddleware = require('../middlewares/auth.middleware');
const upload = require('../middlewares/file.middleware');
const interviewController = require('../controllers/interview.controller')

const interviewRouter = express.Router();

/**
 * @route POST /api/interview/
 * @description Generate an interview report for a candidate
 * @access Private
 */

interviewRouter.post('/' , authMiddleware.authUser , upload.single('resume') , interviewController.generateInterviewReportController)

/**
 * @route GET /api/interview/:interviewId
 * @description Get an interview report by ID
 * @access Private
 */

interviewRouter.get('/report/:interviewId' , authMiddleware.authUser , interviewController.getInterviewReportByIdController)

/**
 * @route GET /api/interview
 * @description Get all interview reports for a user
 * @access Private
 */

interviewRouter.get('/' , authMiddleware.authUser , interviewController.getAllInterviewReportsController)

module.exports = interviewRouter