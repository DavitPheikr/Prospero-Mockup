import Button from "@/components/ui/Button";
import style from "@/scss/components/hasAccount/makeTransactions.module.scss";
export default function makeTransactions() {
  return (
    <div className={style.makeTransactions}>
      <Button variant="primary">Deposito</Button>
      <Button variant="secondary">Tarik</Button>
    </div>
  );
}
