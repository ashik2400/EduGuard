import { useState } from "react";
import { predictStudent } from "./services/api";
import type { StudentInput } from "./types";

function App() {
  const [formData, setFormData] = useState<StudentInput>({
    study_hours: 0,
    attendance_rate: 0,
    previous_grades: 0,
    extracurricular: 0,
    parent_education: 0,
  });

  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: Number(e.target.value),
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await predictStudent(formData);
      setResult(response.prediction);
    } catch {
      setResult("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-xl font-bold mb-4 text-center">
          EduGuard Prediction
        </h1>

        <input
          type="number"
          name="study_hours"
          placeholder="Study Hours per Week"
          className="input"
          onChange={handleChange}
        />

        <input
          type="number"
          name="attendance_rate"
          placeholder="Attendance Rate"
          className="input"
          onChange={handleChange}
        />

        <input
          type="number"
          name="previous_grades"
          placeholder="Previous Grades"
          className="input"
          onChange={handleChange}
        />

        <select
          name="extracurricular"
          className="input"
          onChange={handleChange}
        >
          <option value={0}>Extracurricular: No</option>
          <option value={1}>Extracurricular: Yes</option>
        </select>

        <select
          name="parent_education"
          className="input"
          onChange={handleChange}
        >
          <option value={0}>High School</option>
          <option value={1}>Bachelor</option>
          <option value={2}>Master</option>
          <option value={3}>Doctorate</option>
        </select>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded mt-4"
        >
          {loading ? "Predicting..." : "Predict"}
        </button>

        {result && (
          <div className="mt-4 text-center font-semibold">
            Result: {result}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
