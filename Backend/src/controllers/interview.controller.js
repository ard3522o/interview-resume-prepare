const pdfParse = require("pdf-parse")
const { generateInterviewReport, generateResumePdf } = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")




/**
 * @description Controller to generate interview report based on user self description, resume and job description.
 */
async function generateInterViewReportController(req, res) {
    try {
        const { selfDescription, jobDescription } = req.body
        let resumeContent = ""

        // A resume is optional in the UI; only parse it when one was uploaded.
        if (req.file) {
            const parsedResume = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
            resumeContent = parsedResume.text
        }

        if (!resumeContent && !selfDescription?.trim()) {
            return res.status(400).json({
                message: "Upload a resume or provide a self-description."
            })
        }

        const interViewReportByAi = await generateInterviewReport({
            resume: resumeContent,
            selfDescription,
            jobDescription
        })
        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeContent,
            selfDescription,
            jobDescription,
            ...interViewReportByAi
        })

        return res.status(201).json({
            message: "Interview report generated successfully.",
            interviewReport
        })
    } catch (error) {
        console.error("Interview report generation failed:", error)
        return res.status(502).json({
            message: "Unable to generate the interview strategy. Please try again."
        })
    }

}

/**
 * @description Controller to get interview report by interviewId.
 */
async function getInterviewReportByIdController(req, res) {

    const { interviewId } = req.params

    const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id })

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    res.status(200).json({
        message: "Interview report fetched successfully.",
        interviewReport
    })
}


/** 
 * @description Controller to get all interview reports of logged in user.
 */
async function getAllInterviewReportsController(req, res) {
    const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "Interview reports fetched successfully.",
        interviewReports
    })
}


/**
 * @description Controller to generate resume PDF based on user self description, resume and job description.
 */
 const generateResumePdfController = async (req, res) => {
  try {
    const { reportId } = req.params; // Changed from req.body to req.params

    if (!reportId) {
      return res.status(400).json({ message: "Report ID is required" });
    }

    const report = await InterviewReport.findById(reportId);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    // ... handle PDF generation
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { generateInterViewReportController, getInterviewReportByIdController, getAllInterviewReportsController, generateResumePdfController }
