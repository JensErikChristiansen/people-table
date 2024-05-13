import { Header as HeaderType, SortDirection } from "./definitions";
import style from "./table.module.css";

type ComponentProps = {
  header: HeaderType;
  onSort: (header: HeaderType) => void;
  sorted: boolean;
  sortDirection: SortDirection;
};

const sortCaretClasses: Record<SortDirection, string> = {
  [SortDirection.ASC]: style.sortAsc,
  [SortDirection.DESC]: style.sortDesc,
  [SortDirection.DEFAULT]: style.sortDefault,
};

export default function Header({
  header,
  onSort,
  sorted,
  sortDirection,
}: ComponentProps) {
  return (
    <th onClick={() => onSort(header)}>
      <div className={style.header}>
        <span>{header}</span>

        {sorted && (
          <span className={`${style.sort} ${sortCaretClasses[sortDirection]}`}>
            &#9650;
          </span>
        )}
      </div>
    </th>
  );
}
