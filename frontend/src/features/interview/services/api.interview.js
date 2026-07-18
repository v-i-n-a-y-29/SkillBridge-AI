import axios from 'axios'

const api = axios.create({
     baseURL:'http://localhost:3000/api/interview',
     withCredentials:true
})

/**
 *  @description Generate Interview report 
 *  @access Private 
 *  @route POST /api/interview
 */
export const generateInterviewReport = async ({jobDescription , selfDescription , resumeFile}) => {


    try {
         const formData = new FormData()
         formData.append('jobDescription' , jobDescription)
         formData.append('selfDescription' , selfDescription)
         formData.append('resume' , resumeFile)

         const response =  await api.post('/' , formData , {
            headers:{
                "Content-Type":"multipart/form-data"
            }
         })

         return response.data;
    }
    catch(err)
    {
         console.log(err)
         return err
    }
}


/**
 * 
 *  @description Get the Interview report by id 
 *  @access Private 
 *  @route GET /api/interview/report/:interviewId
 */
export const getInterviewReportById = async ({interviewId}) => {

     try {
          const response = await api.get(`/report/${interviewId}`)
          return response.data;
     }
     catch(err)
     {
          console.log(err)
          return err
     }
}

/**
 * 
 *  @description Get all interview reports of a user 
 *  @access Private 
 *  @route GET /api/interview
 */
export const getAllInterviewReports = async () => {

     try {
          const response = await api.get(`/`)
          return response.data;
     }
     catch(err)
     {
          console.log(err)
          return err
     }
}






