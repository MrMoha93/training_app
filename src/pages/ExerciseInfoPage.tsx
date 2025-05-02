import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getExerciseInfo } from "../services/exerciseInfoService";
import { ExerciseInfo } from "../types";

export default function ExerciseInfoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exerciseInfo, setExerciseInfo] = useState<ExerciseInfo>();

  useEffect(() => {
    async function fetchExerciseInfo() {
      if (!id) return;

      const { data } = await getExerciseInfo(id);

      if (!data) return navigate("/not-found");

      setExerciseInfo(data);
    }
    fetchExerciseInfo();
  }, []);

  if (!exerciseInfo) return <h1>Loading...</h1>;

  return (
    <div className="flex justify-center mt-10">
      <div className="card w-full max-w-md bg-base-200 shadow-xl p-6">
        <h1 className="text-3xl font-bold text-center mb-4">
          {exerciseInfo.name}
        </h1>
        {exerciseInfo.description && (
          <p className="text-left text-md mb-4">{exerciseInfo.description}</p>
        )}
      </div>
    </div>
  );
}
