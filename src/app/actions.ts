type Response = {
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

const API_URL = "https://randomuser.me/api/?results=20";

export async function fetchPeople() {
  const res = await fetch(API_URL);
  const json = await res.json();

  return (json.results as Response[]).map(({ name, location }) => ({
    name: `${name.title} ${name.first} ${name.last}`,
    street: `${location.street.number} ${location.street.name}`,
    city: location.city,
    state: location.state,
    country: location.country,
    postcode: location.postcode.toString(),
  }));
}
