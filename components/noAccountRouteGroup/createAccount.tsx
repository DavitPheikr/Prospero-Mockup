"use client";
import DepositCard from "@/components/noAccountRouteGroup/card";
import { useState } from "react";
import Styles from "@/scss/components/createAccount.module.scss";
interface CreateAccountProps {
  onCardSelect: (cardType: "v1" | "v2") => void;
}

export default function CreateAccount({ onCardSelect }: CreateAccountProps) {
  const [myCardType, setMyCardType] = useState<"v1" | "v2" | null>(null);
  console.log("onCardSelect:", onCardSelect);

  const handleCardButtonClick = (cardType: "v1" | "v2") => {
    onCardSelect(cardType);
  };
  return (
    <>
      <div className={Styles.mainContentWrapper}>
        <div className={Styles.leftColumnWrapper}>
          <div className={Styles.leftColumn}>
            <h2 className={Styles.why}>Why?</h2>
            <ul>
              <li className={Styles.bulletPoint}>
                Start Saving Your Money Effectively
              </li>
              <li className={Styles.bulletPoint}>Earn Monthly Interest</li>
              <li className={Styles.bulletPoint}>Earn Profits From SHU</li>
            </ul>
          </div>
        </div>
        <DepositCard
          cardType="v1"
          onButtonClick={() => handleCardButtonClick("v1")}
        />
        <DepositCard
          cardType="v2"
          onButtonClick={() => handleCardButtonClick("v2")}
        />
      </div>
    </>
  );
}
