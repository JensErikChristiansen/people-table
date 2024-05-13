import { Person as PersonType, headers } from "./definitions";

type ComponentProps = {
  person: PersonType;
};

export default function Person({ person }: ComponentProps) {
  return (
    <tr key={person.name}>
      {headers.map((header) => {
        return <td key={`${header}-${person.name}`}>{person[header]}</td>;
      })}
    </tr>
  );
}
