import { Link } from "react-router-dom";
import { getSessions } from "../services/fakeSessionService";

export default function TrainingSessionPage() {
  return (
    <>
      <h1 className="text-2xl font-semibold text-center py-10">
        Training Sessions
      </h1>
      <div className="container mx-auto p-5 grid place-items-center gap-5">
        {getSessions().map((session) => (
          <Link
            to={`/sessions/${session.id}`}
            key={session.id}
            className=" grid place-items-center w-66 h-14 bg-primary text-sm font-semibold rounded-box hover:scale-110 cursor-pointer transition-transform ease-in-out duration-200"
          >
            {session.name}
          </Link>
        ))}
      </div>
    </>
  );
}
