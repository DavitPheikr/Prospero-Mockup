import Navbar from "@/components/navbar";
import Main from "@/components/account/dashboard/Main";

export default function PrincipalDashboard() {
  return (
    <div>
      <Navbar />
      <Main type="principal" />
    </div>
  );
}
