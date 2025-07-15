"use client";

import { useState, useRef, useEffect } from "react";
import { CalendarArrowDown } from "lucide-react";
import styles from "@/scss/components/hasAccount/transactions/DateRangePicker.module.scss";

interface DateInterval {
  startDate: Date;
  endDate: Date;
}

interface DateRangePickerProps {
  dateInterval: DateInterval;
  onDateIntervalChange: (interval: DateInterval) => void;
  onLoadTransactions?: (startDate: Date | null, endDate: Date | null) => void;
  isDateFilterActive?: boolean;
  className?: string;
}

export default function DateRangePicker({
  dateInterval,
  onDateIntervalChange,
  onLoadTransactions,
  isDateFilterActive = false,
  className = "",
}: DateRangePickerProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDatePicker(false);
      }
    };

    if (showDatePicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDatePicker]);

  // Helper functions for date dropdowns
  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= currentYear - 10; year--) {
      years.push(year);
    }
    return years;
  };

  const generateMonths = () => {
    return [
      { value: 0, label: "Januari" },
      { value: 1, label: "Februari" },
      { value: 2, label: "Maret" },
      { value: 3, label: "April" },
      { value: 4, label: "Mei" },
      { value: 5, label: "Juni" },
      { value: 6, label: "Juli" },
      { value: 7, label: "Agustus" },
      { value: 8, label: "September" },
      { value: 9, label: "Oktober" },
      { value: 10, label: "November" },
      { value: 11, label: "Desember" },
    ];
  };

  const generateDays = (year: number, month: number) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    return days;
  };

  const formatDateRange = () => {
    if (!isDateFilterActive) {
      return "Pilih rentang tanggal";
    }

    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    return `${dateInterval.startDate.toLocaleDateString(
      "id-ID",
      options
    )} - ${dateInterval.endDate.toLocaleDateString("id-ID", options)}`;
  };

  const handleDateChange = (
    type: "start" | "end",
    field: "year" | "month" | "day",
    value: number
  ) => {
    const targetDate =
      type === "start"
        ? new Date(dateInterval.startDate)
        : new Date(dateInterval.endDate);

    if (field === "year") {
      targetDate.setFullYear(value);
    } else if (field === "month") {
      targetDate.setMonth(value);
    } else if (field === "day") {
      targetDate.setDate(value);
    }

    const newInterval = {
      ...dateInterval,
      [type === "start" ? "startDate" : "endDate"]: targetDate,
    };

    onDateIntervalChange(newInterval);

    // Trigger transaction loading with new date range
    if (onLoadTransactions) {
      onLoadTransactions(newInterval.startDate, newInterval.endDate);
    }
  };

  const handleToggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleConfirmSelection = () => {
    setShowDatePicker(false);
    // Trigger transaction loading is already handled in handleDateChange
  };

  const handleClearSelection = () => {
    if (onLoadTransactions) {
      onLoadTransactions(null, null);
    }
    setShowDatePicker(false);
  };

  return (
    <div className={`${styles.dateRangePicker} ${className}`} ref={dropdownRef}>
      <div
        className={`${styles.dateRangeButton} ${
          !isDateFilterActive ? styles.placeholder : ""
        }`}
        onClick={handleToggleDatePicker}
      >
        <span className={styles.dateText}>{formatDateRange()}</span>
        <CalendarArrowDown className={styles.calendarIcon} size={18} />
      </div>

      {showDatePicker && (
        <div className={styles.datePickerDropdown}>
          <div className={styles.dateSection}>
            <h4 className={styles.dateLabel}>Tanggal Mulai</h4>
            <div className={styles.selectContainer}>
              <select
                className={`${styles.dateSelect} ${styles.yearSelect}`}
                value={dateInterval.startDate.getFullYear()}
                onChange={(e) =>
                  handleDateChange("start", "year", parseInt(e.target.value))
                }
              >
                {generateYears().map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <select
                className={`${styles.dateSelect} ${styles.monthSelect}`}
                value={dateInterval.startDate.getMonth()}
                onChange={(e) =>
                  handleDateChange("start", "month", parseInt(e.target.value))
                }
              >
                {generateMonths().map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
              <select
                className={`${styles.dateSelect} ${styles.daySelect}`}
                value={dateInterval.startDate.getDate()}
                onChange={(e) =>
                  handleDateChange("start", "day", parseInt(e.target.value))
                }
              >
                {generateDays(
                  dateInterval.startDate.getFullYear(),
                  dateInterval.startDate.getMonth()
                ).map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.dateSection}>
            <h4 className={styles.dateLabel}>Tanggal Selesai</h4>
            <div className={styles.selectContainer}>
              <select
                className={`${styles.dateSelect} ${styles.yearSelect}`}
                value={dateInterval.endDate.getFullYear()}
                onChange={(e) =>
                  handleDateChange("end", "year", parseInt(e.target.value))
                }
              >
                {generateYears().map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <select
                className={`${styles.dateSelect} ${styles.monthSelect}`}
                value={dateInterval.endDate.getMonth()}
                onChange={(e) =>
                  handleDateChange("end", "month", parseInt(e.target.value))
                }
              >
                {generateMonths().map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
              <select
                className={`${styles.dateSelect} ${styles.daySelect}`}
                value={dateInterval.endDate.getDate()}
                onChange={(e) =>
                  handleDateChange("end", "day", parseInt(e.target.value))
                }
              >
                {generateDays(
                  dateInterval.endDate.getFullYear(),
                  dateInterval.endDate.getMonth()
                ).map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.actionButtons}>
            <button
              className={styles.clearButton}
              onClick={handleClearSelection}
            >
              Hapus & Tampilkan Semua
            </button>
            <button
              className={styles.confirmButton}
              onClick={handleConfirmSelection}
            >
              Terapkan Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
