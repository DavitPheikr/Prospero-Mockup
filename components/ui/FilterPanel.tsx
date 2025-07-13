"use client";

import React from "react";
import styles from "@/scss/components/ui/filterPanel.module.scss";
import Button from "@/components/ui/Button";
import SelectField from "@/components/ui/select-field";

interface FilterOption {
  value: string;
  label: string;
}

interface DateFieldConfig {
  type: "date" | "month" | "select" | "search";
  label: string;
  value: string;
  onChange: (value: string) => void;
  options?: FilterOption[]; // For select type
  placeholder?: string; // For search type
}

interface SelectFieldConfig {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
}

interface FilterPanelProps {
  cooperativeField: SelectFieldConfig;
  dateFields?: DateFieldConfig[];
  additionalFields?: SelectFieldConfig[];
  onReset: () => void;
}

export default function FilterPanel({
  cooperativeField,
  dateFields = [],
  additionalFields = [],
  onReset,
}: FilterPanelProps) {
  // Check if we need multiple rows (for transaction journal with date range)
  const needsMultipleRows = dateFields.length > 1;
  const selectFields = [cooperativeField, ...additionalFields];
  
  return (
    <div className={styles.filters}>
      {needsMultipleRows ? (
        // Multiple rows layout for transaction journal
        <>
          <div className={styles.filterRow}>
            {selectFields.map((field, index) => (
              <SelectField
                key={index}
                label={field.label}
                value={field.value}
                onChange={field.onChange}
                options={field.options}
              />
            ))}
          </div>
          <div className={styles.filterRow}>
            {dateFields.map((field, index) => (
              <div key={index} className={styles.dateGroup}>
                <label>{field.label}</label>
                {field.type === "select" ? (
                  <select
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    className={styles.dateInput}
                  >
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === "search" ? (
                  <input
                    type="text"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    placeholder={field.placeholder}
                    className={styles.dateInput}
                  />
                ) : (
                  <input
                    type={field.type}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    className={styles.dateInput}
                  />
                )}
              </div>
            ))}
            <Button onClick={onReset} className={styles.clearButton}>
              Reset Filter
            </Button>
          </div>
        </>
      ) : (
        // Single row layout for other pages
        <div className={styles.filterRow}>
          {selectFields.map((field, index) => (
            <SelectField
              key={index}
              label={field.label}
              value={field.value}
              onChange={field.onChange}
              options={field.options}
            />
          ))}
          
          {dateFields.map((field, index) => (
            <div key={index} className={styles.dateGroup}>
              <label>{field.label}</label>
              {field.type === "select" ? (
                <select
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  className={styles.dateInput}
                >
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : field.type === "search" ? (
                <input
                  type="text"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder={field.placeholder}
                  className={styles.dateInput}
                />
              ) : (
                <input
                  type={field.type}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  className={styles.dateInput}
                />
              )}
            </div>
          ))}
          
          <Button onClick={onReset} className={styles.clearButton}>
            Reset Filter
          </Button>
        </div>
      )}
    </div>
  );
} 