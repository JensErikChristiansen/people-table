const API_URL = "https://randomuser.me/api/?results=20";

export type Result = {
  name: Record<string, string>;
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string;
  };
};

export async function fetchPeople() {
  "use server";

  const res = await fetch(API_URL);
  const json = await res.json();
  return json.results as Result[];
}
