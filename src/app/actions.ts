import { Response } from "./definitions";

const API_URL = "https://randomuser.me/api/?results=20";

export async function fetchPeople() {
  const res = await fetch(API_URL);
  const json = await res.json();

  return json.results as Response[];
}
