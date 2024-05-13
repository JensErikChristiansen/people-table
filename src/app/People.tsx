"use client";

import { useState } from "react";

import {
  Response,
  headers,
  Header as HeaderType,
  Person as PersonType,
  SortDirection,
  SortMethod,
} from "./definitions";
import useDebounce from "./useDebounce";
import Header from "./Header";
import Person from "./Person";

const sortOrders: Record<SortDirection, SortDirection> = {
  [SortDirection.DEFAULT]: SortDirection.ASC,
  [SortDirection.ASC]: SortDirection.DESC,
  [SortDirection.DESC]: SortDirection.DEFAULT,
};

type ComponentProps = {
  people: PersonType[];
};

export default function People({ people }: ComponentProps) {
  const [query, setQuery] = useState("");
  const debounce = useDebounce();

  const [sortMethod, setSortMethod] = useState<SortMethod>({
    header: "country",
    direction: SortDirection.DEFAULT,
  });

  const list = people
    .filter((p) => {
      return Object.values(p).some((val) =>
        val.toLowerCase().includes(query.toLowerCase())
      );
    })
    .toSorted((a, b) => {
      if (sortMethod.direction === SortDirection.DEFAULT) {
        return 0;
      }

      const header = sortMethod.header;

      if (sortMethod.direction === SortDirection.ASC) {
        return a[header].localeCompare(b[header]);
      }

      return b[header].localeCompare(a[header]);
    });

  function handleSortMethod(header: HeaderType) {
    setSortMethod((prev) => {
      const clickedOnSameHeader = prev.header === header;

      return {
        header,
        // newly clicked headers always start asc
        direction: clickedOnSameHeader
          ? sortOrders[prev.direction]
          : SortDirection.ASC,
      };
    });
  }

  function handleQuery(q: string) {
    debounce(() => {
      setQuery(q);
    }, 500);
  }

  return (
    <>
      <div>
        <p>Search</p>
        <input type="text" onChange={(e) => handleQuery(e.target.value)} />
      </div>

      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <Header
                key={header}
                header={header}
                onSort={handleSortMethod}
                sorted={header === sortMethod.header}
                sortDirection={sortMethod.direction}
              />
            ))}
          </tr>
        </thead>

        <tbody>
          {list.map((person) => (
            <Person key={person.name} person={person} />
          ))}
        </tbody>
      </table>
    </>
  );
}
