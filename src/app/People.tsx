import { fetchPeople } from "./actions";
import PeopleTable from "./PeopleTable";

export default async function People() {
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
      <PeopleTable people={people} />
    </>
  );
}
