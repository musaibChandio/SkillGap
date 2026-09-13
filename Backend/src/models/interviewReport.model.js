import mongoose from "mongoose";

// job description schema
// resume text
// Self description

// matchScore : Number
// Technical Questions [{ question: String, intention: String, answer: String }]
// Behavioral Questions [{ question: String, intention: String, answer: String }]
// SKill Gap [
// {
//  skill:  ""
// severity : {
//     type : String,
//     enum : ["LOW", "MEDIUM", "HIGH"]
//     
// }

// }]
// preparation plan [{ 
//     day : String
//     focus : String
//     tasks : [String] 

// }]
const technicalQuestionsSchema = new mongoose.Schema({
    question:{
        type: String,
        required: [ true , "Technical question is required"]
    },
    intention: {
        type: String,
        required: [ true , "Intention is required"]
    },
    answer: {
        type: String,
        required: [ true , "Answer is required"]
    }
},{
    _id: false

})

const behavioralQuestionsSchema = new mongoose.Schema({
    question:{
        type: String,
        required: [ true , "Behavioral question is required"]
    },
    intention: {
        type: String,
        required: [ true , "Intention is required"]
    },
    answer: {
        type: String,
        required: [ true , "Answer is required"]
    }
},{
    _id: false
})

const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [ true , "Skill is required"]
    },
    severity: {
        type: String,
        enum: ["LOW", "MEDIUM", "HIGH"],
        required: [ true , "Severity is required"]
    }
},{
    _id: false
})

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [ true , "Day is required"]
    },
    focus: {
        type: String,
        required: [ true , "Focus is required"]
    },
    tasks : [{
        type: String,
        required: [ true , "Task is required"]
    }]
},{
    _id: false
})



const interviewReportSchema = new mongoose.Schema({
    jobDescription: {  
        type: String,
        required: [ true , "Job description is required"]
    },
    resume: {
        type: String,
    },
    selfDescription: {
        type: String,
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100
    },
    technicalQuestions: [ technicalQuestionsSchema ],
    behavioralQuestions: [ behavioralQuestionsSchema ],
    skillGaps: [ skillGapSchema ],
    preparationPlan: [ preparationPlanSchema ],

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"    
    },
    title: {
        type: String,
        required: [ true , "Job title is required"]
    } 

});

const InterviewReportModel = mongoose.model("InterviewReport", interviewReportSchema);

export default InterviewReportModel