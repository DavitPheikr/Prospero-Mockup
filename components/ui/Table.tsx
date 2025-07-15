"use client";

import React from "react";
import styles from "./Table.module.scss";

interface Column<T> {
  key: keyof T;
  header: string;
  render?: (item: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
}

export default function Table<T extends { id: string }>({
  columns,
  data,
}: TableProps<T>) {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {columns.map((col) => (
                <td key={String(col.key)}>
                  {col.render ? col.render(item) : String(item[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 