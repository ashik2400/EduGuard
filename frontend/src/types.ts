export interface StudentInput {
  study_hours: number;
  attendance_rate: number;
  previous_grades: number;
  extracurricular: number;
  parent_education: number;
}

export interface PredictionResponse {
  prediction: string;
}
