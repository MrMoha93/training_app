import { useEffect, useState } from "react";
import { getExerciseInfos } from "../services/exerciseInfoService";
import { ExerciseInfo } from "../types";
import { Link } from "react-router-dom";
import { useExercises } from "../context/ExerciseContext";

export default function ExercisesinfoPage() {
  const [exerciseInfos, setExerciseInfos] = useState<ExerciseInfo[]>([]);
  const { searchQuery } = useExercises();

  useEffect(() => {
    async function fetchData() {
      const { data } = await getExerciseInfos();
      setExerciseInfos(data);
    }
    fetchData();
  }, []);

  const filteredInfos = searchQuery
    ? exerciseInfos.filter((e) =>
        e.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : exerciseInfos;

  return (
    <ul className="list bg-base-100 rounded-box shadow-md p-4">
      <li className="pb-2 tracking-wide text-md">
        This is a list of well known exercises in the fitness world. You can get
        an overview of what each exercise is and how popular it is among users.
        You can also rate and comment on each exercise.
      </li>

      {filteredInfos.map((exercise) => (
        <li key={exercise.id} className="list-row cursor-pointer">
          <Link
            to={`/exerciseinfo/${exercise.id}`}
            className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 w-full text-lg"
          >
            <div className="font-medium">{exercise.name}</div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
