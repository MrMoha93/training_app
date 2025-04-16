import { Exercise, getExercise } from "./fakeExerciseService";

interface SessionFormData {
  id?: string;
  name: string;
  exerciseIds: string[];
}

export interface Session {
  id: string;
  name: string;
  exercises: Exercise[];
}

const sessions: Session[] = [
  { id: "1", name: "Monday", exercises: [] },
  { id: "2", name: "Tuesday", exercises: [] },
  { id: "3", name: "Thursday", exercises: [] },
  { id: "4", name: "Saturday", exercises: [] },
  { id: "5", name: "Sunday", exercises: [] },
];

export function getSessions() {
  return sessions;
}

export function getSession(id: string) {
  return sessions.find((session) => session.id === id);
}

export function saveSession(session: SessionFormData) {
  const sessionInDb =
    sessions.find((s) => s.id === session.id) || ({} as Session);

  for (const id of session.exerciseIds) {
    const exercise = getExercise(id);

    if (exercise) sessionInDb.exercises.push(exercise);
  }

  sessionInDb.name = session.name;

  if (!sessionInDb.id) {
    sessionInDb.id = Date.now().toString();
    sessionInDb.exercises = [];
    sessions.push(sessionInDb);
  }

  return sessionInDb;
}

export function deleteSession(id: string) {
  const sessionInDb = sessions.find((session) => session.id === id);

  if (sessionInDb) sessions.splice(sessions.indexOf(sessionInDb), 1);

  return sessionInDb;
}
