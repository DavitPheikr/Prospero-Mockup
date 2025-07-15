import style from "@/scss/components/ui/accountSelector.module.scss";
import Button from "@/components/ui/Button";

interface AccountSelectorProps {
  accountType?:
    | "principal"
    | "voluntary-data"
    | "voluntary"
    | "mandatory"
    | "all";
  onAccountTypeChange: (
    accountType:
      | "principal"
      | "voluntary-data"
      | "voluntary"
      | "mandatory"
      | "all"
  ) => void;
}

export default function AccountSelector({
  accountType,
  onAccountTypeChange,
}: AccountSelectorProps) {
  const accountTypes: {
    value: "principal" | "voluntary-data" | "voluntary" | "mandatory" | "all";
    label: string;
  }[] = [
    { value: "all", label: "All Accounts" },
    { value: "mandatory", label: "Mandatory Accounts" },
    { value: "principal", label: "Principal Accounts" },
    { value: "voluntary", label: "Voluntary Accounts" },
  ];

  return (
    <div className={style.accountSelector}>
      {accountTypes.map((type) => (
        <Button
          key={type.value}
          onClick={() => onAccountTypeChange(type.value)}
          variant={accountType === type.value ? "primary" : "secondary"}
          className={style.accountButton}
        >
          {type.label}
        </Button>
      ))}
    </div>
  );
}
