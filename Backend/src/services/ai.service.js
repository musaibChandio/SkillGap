import { GoogleGenAI } from "@google/genai"
import dotenv from "dotenv";
dotenv.config();
import { z } from "zod";
import { zodToJsonSchema} from "zod-to-json-schema";
import puppeteer from "puppeteer";


const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})
async function invokeGeminiAi() {
    const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: "Hello gemini ! Explain what is interview?"
    })
 
    console.log(response.text)
    
}

const interviewReportSchema = z.object({

    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"), 

    technicalQuestions: z.array(z.object({
    question: z.string().describe("The technical question can be asked in the interview and listed in the report"),
    intention: z.string().describe("The intention of interviewer behind asking this technical question and listed in the report"),
    answer: z.string().describe("How to answer this question, what points to cover what approach to take while answering this question etc and listed in the report")
    })).describe("Technical questions that can be asked in the interview, along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral question can be asked in the interview and listed in the report"),
        intention: z.string().describe("The intention of interviewer behind asking this behavioral question and listed in the report"),
        answer: z.string().describe("How to answer this question, what points to cover what approach to take while answering this question etc and listed in the report")
    })).describe("Behavioral questions that can be asked in the interview, along with their intention and how to answer them"),

    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill that the candidate is lacking or needs improvement and listed in the report"),
        severity: z.enum(["LOW", "MEDIUM", "HIGH"]).describe("The severity of the skill gap, indicating how critical it is for the candidate to improve this skill in order to succeed in the interview")
    })).describe("List of skills gap in the candidate's profile, along with their severity and listed in the report"),

    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1  and listed in the report"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g 'Data Structures', 'System Design', mock interviews etc and listed in the report"),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc and listed in the report")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively and listed in the report"),
    title: z.string().describe("The title of the job for which the interview report is generated."),


})

async function generateInterviewReport({resume, selfDescription, jobDescription}) {

    const prompt = `Analyze the candidate and generate a JSON response.

    The response should include:
    - matchScore: A score between 0 and 100 indicating how well the candidate's profile matches the job describe
    - technicalQuestions: Technical questions that can be asked in the interview, along with their The technical question can be asked in the interview and listed in the report,The intention of interviewer behind asking this technical question and listed in the report,How to answer this question, what points to cover what approach to take while answering this question etc and listed in the report..

    - behavioralQuestions: Behavioral questions that can be asked in the interview, along with The behavioral question can be asked in the interview and listed in the report,The intention of interviewer behind asking this behavioral question and listed in the report ,How to answer this question, what points to cover what approach to take while answering this question etc and listed in the report.

    - skillGaps: List of skills gap in the candidate's profile, along with their severity. The skill that the candidate is lacking or needs improvement and listed in the report"
        severity: ["LOW", "MEDIUM", "HIGH"]) The severity of the skill gap, indicating how critical it is for the candidate to improve this skill in order to succeed in the interview

    -preparationPlan: A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively ,The day number in the preparation plan, starting from 1  and listed in the report,
    The main focus of this day in the preparation plan, e.g 'Data Structures', 'System Design', mock interviews etc and listed in the report",
    List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc and listed in the report day by day preparation plan for the candidate to follow in order to prepare for the interview effectively and listed in the report

    important: each line of the response accorting to interviewReportSchema like matchScore, technicalQuestions including objects of technical question, question, intention, answer, behavioralQuestions including question, intention, answer , skillGaps including skill, severity, and preparationPlan including day, focus, tasks should be present in the response. Do not add any other root-level keys outside of this schema. why you are not generating inside things like Questions, intention, answer, skill, severity, day, focus, tasks etc. Please generate them as well according to the interviewReportSchema format .
    {
      "matchScore": <number between 0 and 100>,
      "technicalQuestions": [
        {
          "question": "<technical question string>",
          "intention": "<interviewer intention string>",
          "answer": "<how to answer string>"
        }
      ],
      "behavioralQuestions": [
        {
          "question": "<behavioral question string>",
          "intention": "<interviewer intention string>",
          "answer": "<how to answer string>"
        }
      ],
      "skillGaps": [
        {
          "skill": "<skill name string>",
          "severity": "LOW" | "MEDIUM" | "HIGH"
        }
      ],
      "preparationPlan": [
        {
          "day": <number starting from 1>,
          "focus": "<focus area string>",
          "tasks": ["<task 1>", "<task 2>"]
        }
      ]
    }

        
      Candidate Data:
    - Resume: ${resume}
    - Self Description: ${selfDescription}
    - Job Description: ${jobDescription}`;

    const response = await ai.models.generateContent({
        
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            systemInstruction : "You are a rigid data-mapping engine. You must output a JSON object containing ONLY the exact keys defined in the responseSchema: matchScore, technicalQuestions, behavioralQuestions, skillGaps, and preparationPlan. Never add root-level keys outside of this schema.",
            responseMimeType : "application/json",
            responseSchema : zodToJsonSchema(interviewReportSchema,{ target: "openApi3"})
        }
    })

       return JSON.parse(response.text);
}


async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" })

    const pdfBuffer = await page.pdf({
        format: "A4", margin: {
            top: "20mm",
            bottom: "20mm",
            left: "15mm",
            right: "15mm"
        }
    })

    await browser.close()

    return pdfBuffer
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {

    const resumePdfSchema = z.object({
        html: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
    })

    const prompt = `Generate resume for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}

                        the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                        The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
                        The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                        you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
                        The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
                        The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
                    `

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(resumePdfSchema),
        }
    })


    const jsonContent = JSON.parse(response.text)

    const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

    return pdfBuffer

}

export { generateInterviewReport, generateResumePdf }

            // responseMimeType: "application/json",
            // responseSchema: zodToJsonSchema(interviewReportSchema, { target: "openApi3" })