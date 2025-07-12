"use client";
import CreateAccount from "@/components/noAccountRouteGroup/createAccount";
import Welcome from "@/components/noAccountRouteGroup/welcome";
import { useState, useEffect } from "react";
import AccountModal from "@/components/noAccountRouteGroup/accountModal";

export default function Hero() {
  const [selectedCardType, setSelectedCardType] = useState<"v1" | "v2" | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardSelection = (cardType: "v1" | "v2") => {
    setSelectedCardType(cardType);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCardType(null); // Reset selection when modal closes
  };

  useEffect(() => {
    if (selectedCardType) {
      console.log("logging selected card type", selectedCardType);
      setIsModalOpen(true); // Automatically open modal when card type is selected
    }
  }, [selectedCardType]);

  return (
    <>
      <Welcome />
      <CreateAccount onCardSelect={handleCardSelection} />

      <AccountModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        accountType={selectedCardType || "v1"}
      />
    </>
  );
}
