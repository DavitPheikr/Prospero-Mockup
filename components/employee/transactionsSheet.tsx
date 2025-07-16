"use client";

import React, { useState, useMemo } from "react";
import styles from "@/scss/components/employee/transactionsSheet.module.scss";
import FilterPanel from "@/components/ui/FilterPanel";
import Button from "@/components/ui/Button";
import AccountSelector from "@/components/ClientSide/statistics/accountSelector";
import DateRangePicker from "@/components/ClientSide/transactions/DateRangePicker";

// Mock member data
const members = [
  {
    cif: "100001",
    name: "Andi Wijaya",
    email: "andi@koperasi.com",
    joinDate: "2022-03-15",
  },
  {
    cif: "100002",
    name: "Budi Santoso",
    email: "budi@koperasi.com",
    joinDate: "2021-11-02",
  },
  {
    cif: "100003",
    name: "Citra Dewi",
    email: "citra@koperasi.com",
    joinDate: "2023-01-20",
  },
  {
    cif: "100004",
    name: "Dewi Lestari",
    email: "dewi@koperasi.com",
    joinDate: "2022-07-05",
  },
  {
    cif: "100005",
    name: "Eko Prasetyo",
    email: "eko@koperasi.com",
    joinDate: "2024-02-10",
  },
];

type AccountType = "Mandatory" | "Principal" | "Voluntary";
type Transaction = {
  id: string;
  date: string;
  type: string;
  accountType: AccountType;
  amount: number;
  description: string;
};
type TransactionsMap = { [key: string]: Transaction[] };
const transactions: TransactionsMap = {
  "100001": [
    // Mandatory Account
    {
      id: "T001",
      date: "2024-07-01",
      type: "Bunga Bulanan",
      accountType: "Mandatory",
      amount: 50000,
      description: "Bunga bulanan untuk simpanan wajib.",
    },
    {
      id: "T002",
      date: "2024-07-10",
      type: "Distribusi SHU",
      accountType: "Mandatory",
      amount: 120000,
      description: "Pembagian SHU simpanan wajib.",
    },
    // Principal Account
    {
      id: "T003",
      date: "2024-07-01",
      type: "Bunga Bulanan",
      accountType: "Principal",
      amount: 70000,
      description: "Bunga bulanan untuk simpanan pokok.",
    },
    {
      id: "T004",
      date: "2024-07-10",
      type: "Distribusi SHU",
      accountType: "Principal",
      amount: 150000,
      description: "Pembagian SHU simpanan pokok.",
    },
  ],
  "100002": [
    // Mandatory Account
    {
      id: "T005",
      date: "2024-07-01",
      type: "Bunga Bulanan",
      accountType: "Mandatory",
      amount: 40000,
      description: "Bunga bulanan untuk simpanan wajib.",
    },
    {
      id: "T006",
      date: "2024-07-10",
      type: "Distribusi SHU",
      accountType: "Mandatory",
      amount: 100000,
      description: "Pembagian SHU simpanan wajib.",
    },
    // Principal Account
    {
      id: "T007",
      date: "2024-07-01",
      type: "Bunga Bulanan",
      accountType: "Principal",
      amount: 60000,
      description: "Bunga bulanan untuk simpanan pokok.",
    },
    {
      id: "T008",
      date: "2024-07-10",
      type: "Distribusi SHU",
      accountType: "Principal",
      amount: 130000,
      description: "Pembagian SHU simpanan pokok.",
    },
    // Voluntary Account
    {
      id: "T009",
      date: "2024-07-02",
      type: "Setoran Sukarela",
      accountType: "Voluntary",
      amount: 300000,
      description: "Setoran sukarela anggota.",
    },
    {
      id: "T010",
      date: "2024-07-05",
      type: "Penarikan Sukarela",
      accountType: "Voluntary",
      amount: -100000,
      description: "Penarikan dana sukarela oleh anggota.",
    },
    {
      id: "T011",
      date: "2024-07-10",
      type: "Bunga Bulanan",
      accountType: "Voluntary",
      amount: 25000,
      description: "Bunga bulanan untuk simpanan sukarela.",
    },
    {
      id: "T012",
      date: "2024-07-15",
      type: "Distribusi SHU",
      accountType: "Voluntary",
      amount: 50000,
      description: "Pembagian SHU simpanan sukarela.",
    },
  ],
  "100003": [
    // Mandatory Account
    {
      id: "T013",
      date: "2024-07-01",
      type: "Bunga Bulanan",
      accountType: "Mandatory",
      amount: 35000,
      description: "Bunga bulanan untuk simpanan wajib.",
    },
    {
      id: "T014",
      date: "2024-07-10",
      type: "Distribusi SHU",
      accountType: "Mandatory",
      amount: 90000,
      description: "Pembagian SHU simpanan wajib.",
    },
    // Principal Account
    {
      id: "T015",
      date: "2024-07-01",
      type: "Bunga Bulanan",
      accountType: "Principal",
      amount: 50000,
      description: "Bunga bulanan untuk simpanan pokok.",
    },
    {
      id: "T016",
      date: "2024-07-10",
      type: "Distribusi SHU",
      accountType: "Principal",
      amount: 110000,
      description: "Pembagian SHU simpanan pokok.",
    },
    // Voluntary Account
    {
      id: "T017",
      date: "2024-07-03",
      type: "Setoran Sukarela",
      accountType: "Voluntary",
      amount: 200000,
      description: "Setoran sukarela anggota.",
    },
    {
      id: "T018",
      date: "2024-07-08",
      type: "Penarikan Sukarela",
      accountType: "Voluntary",
      amount: -50000,
      description: "Penarikan dana sukarela oleh anggota.",
    },
    {
      id: "T019",
      date: "2024-07-10",
      type: "Bunga Bulanan",
      accountType: "Voluntary",
      amount: 20000,
      description: "Bunga bulanan untuk simpanan sukarela.",
    },
    {
      id: "T020",
      date: "2024-07-15",
      type: "Distribusi SHU",
      accountType: "Voluntary",
      amount: 40000,
      description: "Pembagian SHU simpanan sukarela.",
    },
  ],
  "100004": [
    // Mandatory Account
    {
      id: "T021",
      date: "2024-07-01",
      type: "Bunga Bulanan",
      accountType: "Mandatory",
      amount: 30000,
      description: "Bunga bulanan untuk simpanan wajib.",
    },
    {
      id: "T022",
      date: "2024-07-10",
      type: "Distribusi SHU",
      accountType: "Mandatory",
      amount: 80000,
      description: "Pembagian SHU simpanan wajib.",
    },
    // Principal Account
    {
      id: "T023",
      date: "2024-07-01",
      type: "Bunga Bulanan",
      accountType: "Principal",
      amount: 40000,
      description: "Bunga bulanan untuk simpanan pokok.",
    },
    {
      id: "T024",
      date: "2024-07-10",
      type: "Distribusi SHU",
      accountType: "Principal",
      amount: 90000,
      description: "Pembagian SHU simpanan pokok.",
    },
  ],
  "100005": [
    // Mandatory Account
    {
      id: "T025",
      date: "2024-07-01",
      type: "Bunga Bulanan",
      accountType: "Mandatory",
      amount: 25000,
      description: "Bunga bulanan untuk simpanan wajib.",
    },
    {
      id: "T026",
      date: "2024-07-10",
      type: "Distribusi SHU",
      accountType: "Mandatory",
      amount: 70000,
      description: "Pembagian SHU simpanan wajib.",
    },
    // Principal Account
    {
      id: "T027",
      date: "2024-07-01",
      type: "Bunga Bulanan",
      accountType: "Principal",
      amount: 30000,
      description: "Bunga bulanan untuk simpanan pokok.",
    },
    {
      id: "T028",
      date: "2024-07-10",
      type: "Distribusi SHU",
      accountType: "Principal",
      amount: 60000,
      description: "Pembagian SHU simpanan pokok.",
    },
  ],
};
export default function TransactionsSheet() {
  const [selectedMember, setSelectedMember] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAccountType, setSelectedAccountType] = useState<
    "all" | "mandatory" | "principal" | "voluntary" | "voluntary-data"
  >("all");
  const [dateInterval, setDateInterval] = useState({
    startDate: new Date(2024, 6, 1), // July 1, 2024
    endDate: new Date(2024, 6, 31), // July 31, 2024
  });
  const [isDateFilterActive, setIsDateFilterActive] = useState(false);

  // Date filter logic for transactions
  function filterByDate(tx: Transaction) {
    if (!isDateFilterActive) return true;
    const txDate = new Date(tx.date);
    return txDate >= dateInterval.startDate && txDate <= dateInterval.endDate;
  }
  // Filtered member list by search or selection
  const filteredMembers = useMemo(() => {
    let list = members;
    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      list = list.filter(
        (m) =>
          m.cif.toLowerCase().includes(term) ||
          m.name.toLowerCase().includes(term)
      );
    }
    if (selectedMember) {
      list = list.filter((m) => m.cif === selectedMember);
    }
    return list;
  }, [searchTerm, selectedMember]);

  // Member select options
  const memberOptions = [
    { value: "", label: "Semua Anggota" },
    ...members.map((m) => ({
      value: m.cif,
      label: `${m.name} (CIF: ${m.cif})`,
    })),
  ];

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <h1>Daftar Transaksi Anggota</h1>
        </div>

        <div className={styles.filterPanel}>
          <FilterPanel
            cooperativeField={{
              label: "Pilih Anggota",
              value: selectedMember,
              onChange: setSelectedMember,
              options: memberOptions,
            }}
            additionalFields={[]}
            dateFields={[
              {
                type: "search",
                label: "Cari ID/Nama Anggota",
                value: searchTerm,
                onChange: setSearchTerm,
                placeholder: "Masukkan ID atau Nama...",
              },
            ]}
            onReset={() => {
              setSelectedMember("");
              setSearchTerm("");
            }}
          />
        </div>

        <div className={styles.tableContainer}>
          <div className={styles.tableContainer}>
            <table className={styles.balanceTable}>
              <thead>
                <tr>
                  <th>CIF</th>
                  <th>Nama</th>
                  <th>Email</th>
                  <th>Tanggal Bergabung</th>
                  <th>Akun Dimiliki</th>
                  <th>Total Saldo</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => {
                  const txs = transactions[member.cif] || [];
                  const accountTypes = Array.from(
                    new Set(txs.map((t) => t.accountType))
                  );
                  const accountLabels = accountTypes.length
                    ? accountTypes
                        .map((t) => {
                          if (t === "Mandatory") return "Wajib";
                          if (t === "Principal") return "Pokok";
                          if (t === "Voluntary") return "Sukarela";
                          return t;
                        })
                        .join(", ")
                    : "-";
                  const totalBalance = txs.reduce(
                    (sum, t) => sum + t.amount,
                    0
                  );
                  // Split name for first and last name columns
                  const [firstName, ...rest] = member.name.split(" ");
                  const lastName = rest.join(" ");
                  return (
                    <tr
                      key={member.cif}
                      className={
                        selectedMember === member.cif ? styles.selectedRow : ""
                      }
                      onClick={() => setSelectedMember(member.cif)}
                      style={{ cursor: "pointer" }}
                      title="Klik untuk melihat transaksi"
                    >
                      <td>
                        <span className={styles.accountName}>{member.cif}</span>
                      </td>
                      <td>
                        <span className={styles.accountName}>{firstName}</span>
                        {lastName && <span> {lastName}</span>}
                      </td>
                      <td>
                        <span>{member.email}</span>
                      </td>
                      <td>
                        <span>
                          {new Date(member.joinDate).toLocaleDateString(
                            "id-ID",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </td>
                      <td>{accountLabels}</td>
                      <td>
                        {totalBalance.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                        })}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <Button
                          type="button"
                          onClick={() => {
                            setSelectedMember(member.cif);
                            setSelectedAccountType("all");
                          }}
                          variant="secondary"
                        >
                          View Details
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Transaction Table for selected member */}
          {selectedMember && transactions[selectedMember] && (
            <>
              <div
                style={{
                  display: "flex",
                  gap: "1.5rem",
                  marginBottom: "1.5rem",
                  flexWrap: "wrap",
                }}
              >
                <div className={styles.selectorContainer}>
                  <AccountSelector
                    accountType={selectedAccountType}
                    onAccountTypeChange={setSelectedAccountType}
                  />
                  <DateRangePicker
                    dateInterval={dateInterval}
                    onDateIntervalChange={(interval) => {
                      setDateInterval(interval);
                      setIsDateFilterActive(true);
                    }}
                    isDateFilterActive={isDateFilterActive}
                    onLoadTransactions={(start, end) => {
                      if (start && end) {
                        setDateInterval({ startDate: start, endDate: end });
                        setIsDateFilterActive(true);
                      } else {
                        setIsDateFilterActive(false);
                      }
                    }}
                  />
                </div>
              </div>
              <div className={styles.tableContainer}>
                <table className={styles.balanceTable}>
                  <thead className={styles.transactionTableHead}>
                    <tr>
                      <th>ID Transaksi</th>
                      <th>Tanggal</th>
                      <th>Jenis</th>
                      <th>Jenis Akun</th>
                      <th>Jumlah</th>
                      <th>Deskripsi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions[selectedMember]
                      .filter((tx: Transaction) => {
                        // Filter by account type
                        if (selectedAccountType === "all") return true;
                        if (selectedAccountType === "voluntary")
                          return tx.accountType === "Voluntary";
                        if (selectedAccountType === "mandatory")
                          return tx.accountType === "Mandatory";
                        if (selectedAccountType === "principal")
                          return tx.accountType === "Principal";
                        return true;
                      })
                      .filter(filterByDate)
                      .map((tx: Transaction) => (
                        <tr key={tx.id}>
                          <td>
                            <span className={styles.accountName}>{tx.id}</span>
                          </td>
                          <td>{tx.date}</td>
                          <td>{tx.type}</td>
                          <td>{tx.accountType}</td>
                          <td>
                            {tx.amount.toLocaleString("id-ID", {
                              style: "currency",
                              currency: "IDR",
                              minimumFractionDigits: 0,
                            })}
                          </td>
                          <td>{tx.description}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
  // ...existing code...
}
