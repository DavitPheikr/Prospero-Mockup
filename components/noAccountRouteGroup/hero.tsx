"use client";
import CreateAccount from "@/components/noAccountRouteGroup/createAccount";
import Welcome from "@/components/noAccountRouteGroup/welcome";
import { useState, useEffect } from "react";

export default function Hero() {
  const [selectedCardType, setSelectedCardType] = useState<"v1" | "v2" | null>(
    null
  );

  const handleCardSelection = (cardType: "v1" | "v2") => {
    setSelectedCardType(cardType);
  };

  useEffect(() => {
    if (selectedCardType) {
      console.log("logging selected card type", selectedCardType);
    }
  }, [selectedCardType]);

  return (
    <>
      <Welcome />
      <CreateAccount onCardSelect={handleCardSelection} />
      {selectedCardType && (
        <div
          style={{
            marginTop: "16px",
            padding: "16px",
            backgroundColor: "#e3f2fd",
            borderRadius: "4px",
          }}
        >
          Selected Account Type:{" "}
          <strong>{selectedCardType.toUpperCase()}</strong>
        </div>
      )}
    </>
  );
}
