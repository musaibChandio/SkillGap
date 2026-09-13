// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const pdfParse = require("pdf-parse");
// import generateInterviewReport from "../services/ai.service.js";
// const interviewReportModel = require("../models/interviewReport.model.js");

// async function generateInteViewReportController(req, res) {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ message: "Resume file is required" });
//         }
        
//         // Parse PDF using standard pdf-parse syntax
//         const pdfData = await pdfParse(req.file.buffer);
//         const resumeText = pdfData.text;

//         const { selfDescription, jobDescriptions } = req.body;

//         const interViewReportByAi = await generateInterviewReport({
//             resume: resumeText,
//             selfDescription,
//             jobDescriptions
//         });

//         const interviewReport = await interviewReportModel.create({
//             user: req.user.id,
//             resume: resumeText,
//             selfDescription,
//             jobDescriptions,
//             ...interViewReportByAi    
//         });

//         res.status(201).json({
//             message: "Interview report generated successfully",
//             interviewReport
//         });

//     } catch (error) {
//         console.error("Error generating interview report:", error);
//         res.status(500).json({ message: "Internal server error", error: error.message });
//     }
// }

// export { generateInteViewReportController };


// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const pdfParse = require("pdf-parse");
import { PDFParse } from 'pdf-parse';
import { generateInterviewReport } from "../services/ai.service.js";
import interviewReportModel from "../models/interviewReport.model.js";


async function generateInteViewReportController(req, res) {
    
     
    const resumeContent = await (new PDFParse(Uint8Array.from(req.file.buffer))).getText();
    const { selfDescription, jobDescription } = req.body;

    const interViewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    });
    console.log( interViewReportByAi);
    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interViewReportByAi    
    })

    res.status(201).json({
        message: "Interview report generated successfully",
        interviewReport
    });




    // try {
    //     const { resume, selfDescription, jobDescriptions } = req.body;
    //     if (!resume || !selfDescription || !jobDescriptions) {
    //         return res.status(400).json({ message: "All fields are required" });
    //     }
    //     const report = await generateInterviewReport({ resume, selfDescription, jobDescriptions }); 
    //     res.status(200).json({ report });
    // } catch (error) {
    //     res.status(500).json({ error: error.message });
    // }
}


export { generateInteViewReportController };
