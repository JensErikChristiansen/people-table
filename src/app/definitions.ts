export type Response = {
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

export const headers = [
  "name",
  "street",
  "city",
  "state",
  "country",
  "postcode",
] as const;

export type Header = (typeof headers)[number];

export type Person = {
  [P in Header]: string;
};

export enum SortDirection {
  ASC,
  DESC,
  DEFAULT,
}

export type SortMethod = {
  header: Header;
  direction: SortDirection;
};
