"use client";

import { useState, useEffect } from "react";
import style from "./table.module.css";
import { fetchPeople } from "./actions";

const headers = [
  "name",
  "street",
  "city",
  "state",
  "country",
  "postcode",
] as const;

type Header = (typeof headers)[number];

type Person = {
  [P in Header]: string;
};

enum SortOrder {
  ASC,
  DESC,
  DEFAULT,
}

type SortMethod = {
  header: Header;
  order: SortOrder;
};

const sortOrders: Record<SortOrder, SortOrder> = {
  [SortOrder.DEFAULT]: SortOrder.ASC,
  [SortOrder.ASC]: SortOrder.DESC,
  [SortOrder.DESC]: SortOrder.DEFAULT,
};

const sortCaretClasses: Record<SortOrder, string> = {
  [SortOrder.ASC]: style.sortAsc,
  [SortOrder.DESC]: style.sortDesc,
  [SortOrder.DEFAULT]: style.sortDefault,
};

export default function Home() {
  const [people, setPeople] = useState<Person[]>([]);
  const [query, setQuery] = useState("");

  const [sortMethod, setSortMethod] = useState<SortMethod>({
    header: "country",
    order: SortOrder.DEFAULT,
  });

  useEffect(() => {
    fetchPeople().then((res) => {
      setPeople(res);
    });
  }, []);

  function handleSortMethod(header: Header) {
    setSortMethod((prev) => {
      const clickedOnSameHeader = prev.header === header;

      return {
        header,
        // newly clicked headers always start asc
        order: clickedOnSameHeader ? sortOrders[prev.order] : SortOrder.ASC,
      };
    });
  }

  function getFinalList() {
    return people
      .filter((p) => {
        return Object.values(p).some((val) =>
          val.toLowerCase().includes(query.toLowerCase())
        );
      })
      .toSorted((a, b) => {
        if (sortMethod.order === SortOrder.DEFAULT) {
          return 0;
        }

        const header = sortMethod.header;

        if (sortMethod.order === SortOrder.ASC) {
          return a[header].localeCompare(b[header]);
        }

        return b[header].localeCompare(a[header]);
      });
  }

  return (
    <>
      <div>
        <p>Search</p>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} onClick={() => handleSortMethod(header)}>
                <div className={style.header}>
                  <span>{header}</span>

                  {sortMethod.header === header && (
                    <span
                      className={`${style.sort} ${
                        sortCaretClasses[sortMethod.order]
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
          {getFinalList().map((person) => {
            return (
              <tr key={person.name}>
                {headers.map((header) => {
                  return (
                    <td key={`${header}-${person.name}`}>{person[header]}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
