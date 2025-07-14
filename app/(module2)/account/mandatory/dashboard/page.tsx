import Navbar from "@/components/navbar";
import Main from "@/components/account/dashboard/Main";

export default function MandatoryDashboard() {
  return (
    <div>
      <Navbar />
      <Main type="mandatory" />
    </div>
  );
}
