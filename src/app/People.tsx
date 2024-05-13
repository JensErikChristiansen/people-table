"use client";

import { Result } from "./actions";

const headers = ["name", "street", "city", "state", "country", "postcode"];

type Person = {
  [P in (typeof headers)[number]]: string;
};

type ComponentProps = {
  data: Result[];
  // onRowHover: (name: string) => void;
};

export default function People({ data }: ComponentProps) {
  const people: Person[] = data.map(({ name, location }) => ({
    name: `${name.title} ${name.first} ${name.last}`,
    street: `${location.street.number} ${location.street.name}`,
    city: location.city,
    state: location.state,
    country: location.country,
    postcode: location.postcode,
  }));

  function handleMouseEnter(name: string) {
    console.log(name);
    // onRowHover(name);
  }

  return (
    <table>
      <thead>
        <tr>
          {headers.map((h) => (
            <th key={h}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {people.map((p) => {
          return (
            <tr key={p.name}>
              {headers.map((h) => {
                return <td key={`${p.name}-${h}`}>{p[h]}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
