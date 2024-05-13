import People from "./People";
import { fetchPeople } from "./actions";

export default async function Home() {
  const data = await fetchPeople();

  return (
    <div>
      <People data={data} />
    </div>
  );
}
