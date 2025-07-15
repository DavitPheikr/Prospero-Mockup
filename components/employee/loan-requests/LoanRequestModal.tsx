"use client";

import React, { useState } from "react";
import styles from "./LoanRequestModal.module.scss";
import Button from "@/components/ui/Button";
import { LoanRequest } from "@/data/loanRequestsData";

interface LoanRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newRequest: Omit<LoanRequest, "id">) => void;
}

const steps = ["Loan Details", "Financial Info", "Member Info", "Review"];

const formatCurrency = (value: string) => {
  const numberValue = Number(value.replace(/[^0-9]/g, ""));
  if (isNaN(numberValue)) return "";
  return new Intl.NumberFormat("id-ID").format(numberValue);
};

const parseCurrency = (value: string) => {
  return Number(value.replace(/[^0-9]/g, ""));
};

export default function LoanRequestModal({
  isOpen,
  onClose,
  onSubmit,
}: LoanRequestModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    memberName: "",
    amount: "",
    purpose: "Home Improvement",
    term: "12",
    monthlyIncome: "",
    monthlyExpenses: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (["amount", "monthlyIncome", "monthlyExpenses"].includes(name)) {
      setFormData((prev) => ({ ...prev, [name]: formatCurrency(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRequest = {
      memberId: `mem-${Math.random().toString(36).substr(2, 9)}`,
      memberName: formData.memberName,
      requestDate: new Date().toISOString().split("T")[0],
      amount: parseCurrency(formData.amount),
      purpose: formData.purpose,
      term: Number(formData.term),
      monthlyIncome: parseCurrency(formData.monthlyIncome),
      monthlyExpenses: parseCurrency(formData.monthlyExpenses),
      status: "Pending" as const,
      memberData: {
        creditScore: 680, // Mock data
        savings: 20000000, // Mock data
      },
    };
    onSubmit(newRequest);
    onClose();
    // Reset form
    setCurrentStep(0);
    setFormData({
      memberName: "",
      amount: "",
      purpose: "Home Improvement",
      term: "12",
      monthlyIncome: "",
      monthlyExpenses: "",
    });
  };

  if (!isOpen) {
    return null;
  }

  const displayFormatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.progressContainer}>
          <div
            className={styles.progressBar}
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>

        <h2>{steps[currentStep]}</h2>

        <form onSubmit={handleSubmit}>
          {currentStep === 0 && (
            <div className={styles.step}>
              <div className={styles.formGroup}>
                <label htmlFor="amount">Loan Amount</label>
                <input
                  id="amount"
                  name="amount"
                  type="text"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="purpose">Purpose of Loan</label>
                <select
                  id="purpose"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                >
                  <option>Home Improvement</option>
                  <option>Car Purchase</option>
                  <option>Debt Consolidation</option>
                  <option>Vacation</option>
                  <option>Other</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="term">Loan Term (Months)</label>
                <select
                  id="term"
                  name="term"
                  value={formData.term}
                  onChange={handleChange}
                >
                  <option>12</option>
                  <option>24</option>
                  <option>36</option>
                  <option>48</option>
                  <option>60</option>
                </select>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className={styles.step}>
              <div className={styles.formGroup}>
                <label htmlFor="monthlyIncome">Monthly Income</label>
                <input
                  id="monthlyIncome"
                  name="monthlyIncome"
                  type="text"
                  value={formData.monthlyIncome}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="monthlyExpenses">Monthly Expenses</label>
                <input
                  id="monthlyExpenses"
                  name="monthlyExpenses"
                  type="text"
                  value={formData.monthlyExpenses}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className={styles.step}>
              <div className={styles.formGroup}>
                <label htmlFor="memberName">Member Name</label>
                <input
                  id="memberName"
                  name="memberName"
                  type="text"
                  value={formData.memberName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className={styles.step}>
              <div className={styles.reviewSection}>
                <h4>Loan Details</h4>
                <p><strong>Amount:</strong> {displayFormatCurrency(parseCurrency(formData.amount))}</p>
                <p><strong>Purpose:</strong> {formData.purpose}</p>
                <p><strong>Term:</strong> {formData.term} months</p>
              </div>
              <div className={styles.reviewSection}>
                <h4>Financial Information</h4>
                <p><strong>Monthly Income:</strong> {displayFormatCurrency(parseCurrency(formData.monthlyIncome))}</p>
                <p><strong>Monthly Expenses:</strong> {displayFormatCurrency(parseCurrency(formData.monthlyExpenses))}</p>
              </div>
              <div className={styles.reviewSection}>
                <h4>Member Information</h4>
                <p><strong>Name:</strong> {formData.memberName}</p>
              </div>
            </div>
          )}

          <div className={styles.actions}>
            {currentStep > 0 && (
              <Button type="button" onClick={handleBack} className={styles.backButton}>
                Back
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button type="submit">Submit Request</Button>
            )}
            <Button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 