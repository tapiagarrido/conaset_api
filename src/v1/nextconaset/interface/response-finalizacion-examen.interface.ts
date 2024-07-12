export interface ResponseFinalizacionExamenOk {
    createdRendition: CreatedRendition;
    resultExam: ResultExam;
}

interface CreatedRendition {
    message: string;
}

interface ResultExam {
    exam_maximum_score: number;
    exam_minimum_score: number;
    exam_applicant_actual_questions_answered: number;
    exam_applicant_actual_questions_correct: number;
    exam_applicant_actual_score: number;
    exam_applicant_result: string;
}

export interface ResponseFinalizacionExamenError {
    message: string;
}