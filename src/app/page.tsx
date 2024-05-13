import { fetchPeople } from "./actions";
import People from "./People";

export default async function Home() {
  const rawData = await fetchPeople();

  const people = rawData.map(({ name, location }) => ({
    name: `${name.title} ${name.first} ${name.last}`,
    street: `${location.street.number} ${location.street.name}`,
    city: location.city,
    state: location.state,
    country: location.country,
    postcode: location.postcode.toString(),
  }));

  return (
    <>
      <People people={people} />
    </>
  );
}
