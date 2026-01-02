import type { StudentInput, PredictionResponse } from "../types";

export async function predictStudent(
  data: StudentInput
): Promise<PredictionResponse> {
  const response = await fetch("http://127.0.0.1:5000/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Prediction failed");
  }

  return response.json();
}
