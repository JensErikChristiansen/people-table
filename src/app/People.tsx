"use client";

import { useState, useEffect } from "react";
import { Result } from "./actions";
import style from "./table.module.css";

const headers = ["name", "street", "city", "state", "country", "postcode"];

type Person = {
  [P in (typeof headers)[number]]: string;
};

type ComponentProps = {
  data: Result[];
};

enum SortOrder {
  ASC,
  DESC,
  DEFAULT,
}

export default function People({ data }: ComponentProps) {
  const [people, setPeople] = useState<Person[]>([]);

  const [sortMethod, setSortMethod] = useState({
    header: "country",
    order: SortOrder.DEFAULT,
  });

  useEffect(() => {
    setPeople(mapPeople(data));
  }, [data]);

  function mapPeople(d: Result[]) {
    return d.map(({ name, location }) => ({
      name: `${name.title} ${name.first} ${name.last}`,
      street: `${location.street.number} ${location.street.name}`,
      city: location.city,
      state: location.state,
      country: location.country,
      postcode: location.postcode,
    }));
  }

  useEffect(() => {
    sort();
  }, [sortMethod]);

  function sort() {
    setPeople((prev) => {
      if (sortMethod.order === SortOrder.DEFAULT) {
        return mapPeople(data);
      }

      return prev.toSorted((a, b) => {
        const header = sortMethod.header;

        if (sortMethod.order === SortOrder.ASC) {
          return a[header].localeCompare(b[header]);
        }

        return b[header].localeCompare(a[header]);
      });
    });
  }

  function handleSortMethod(header: string) {
    setSortMethod((prev) => {
      return {
        header,
        order: getNextSortMethod(prev.order),
      };
    });
  }

  function getNextSortMethod(prevOrder: SortOrder) {
    if (prevOrder === SortOrder.DEFAULT) {
      return SortOrder.ASC;
    }

    if (prevOrder === SortOrder.ASC) {
      return SortOrder.DESC;
    }

    return SortOrder.DEFAULT;
  }

  return (
    <table>
      <thead>
        <tr>
          {headers.map((h) => (
            <th key={h} onClick={() => handleSortMethod(h)}>
              <div className={style.header}>
                <span>{h}</span>
                {sortMethod.header === h && (
                  <span
                    className={`${style.sort} ${
                      sortMethod.order === SortOrder.ASC
                        ? style.sortAsc
                        : sortMethod.order === SortOrder.DESC
                        ? style.sortDesc
                        : style.sortDef
                    }`}
                  >
                    &#9650;
                  </span>
                )}
              </div>
            </th>
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
