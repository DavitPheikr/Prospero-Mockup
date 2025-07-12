"use client";
import AccountCard from "@/components/noAccountRouteGroup/accountCard";
import { useState } from "react";
import Styles from "@/scss/components/createAccount/createAccount.module.scss";
import { Check } from "lucide-react";

interface CreateAccountProps {
  onCardSelect: (cardType: "v1" | "v2") => void;
}

export default function CreateAccount({ onCardSelect }: CreateAccountProps) {
  const [myCardType, setMyCardType] = useState<"v1" | "v2" | null>(null);

  const handleCardButtonClick = (cardType: "v1" | "v2") => {
    onCardSelect(cardType);
  };

  return (
    <div className={Styles.mainContentWrapper}>
      <div className={Styles.leftColumnWrapper}>
        <div className={Styles.leftColumn}>
          <h2 className={Styles.why}>Why Create an Account?</h2>
          <ul>
            <li className={Styles.bulletPoint}>
              <div className={Styles.checkIcon}>
                <Check size={16} />
              </div>
              Start Saving Your Money Effectively
            </li>
            <li className={Styles.bulletPoint}>
              <div className={Styles.checkIcon}>
                <Check size={16} />
              </div>
              Earn Monthly Interest on Your Balance
            </li>
            <li className={Styles.bulletPoint}>
              <div className={Styles.checkIcon}>
                <Check size={16} />
              </div>
              Receive Profits From SHU Distribution
            </li>
          </ul>
        </div>
      </div>
      <AccountCard
        cardType="v1"
        onButtonClick={() => handleCardButtonClick("v1")}
      />
      <AccountCard
        cardType="v2"
        onButtonClick={() => handleCardButtonClick("v2")}
      />
    </div>
  );
}
