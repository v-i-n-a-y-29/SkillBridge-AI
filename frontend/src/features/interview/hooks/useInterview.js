import { getAllInterviewReports, generateInterviewReport, getInterviewReportById } from "../services/api.interview"
import { useContext } from "react"
import { InterviewContext } from "../interview.context"
// import { useParams } from "react-router"


export const useInterview = () => {

      const context = useContext(InterviewContext)
    //   const { interviewId } = useParams()

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context

    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {

        setLoading(true)
        let response = null

        try{
             response = await generateInterviewReport({jobDescription, selfDescription, resumeFile})

            setReport(response.report)


        }
        catch(error){
            console.log(error)
        }
        finally{
            setLoading(false)
        }

        return response.report
    }

    const getReportById = async (reportId) => {

        setLoading(true)
        let response = null

        try{
             response = await getInterviewReportById(reportId)

            setReport(response.report)
        }
        catch(error){
            console.log(error)
        }
        finally{
            setLoading(false)
        }

        return response.report
    }

    const getAllReports = async () => {

        setLoading(true)
        let response = null

        try{
             response = await getAllInterviewReports()

            setReports(response.report)
        }
        catch(error){
            console.log(error)
        }
        finally{
            setLoading(false)
        }

        return response.report
    }


    return { loading, report, reports,  generateReport , getReportById , getAllReports}

          
}