import Navbar from "@/components/navbar";
import Main from "@/components/account/dashboard/Main";

export default function VoluntaryDashboard() {
  return (
    <div>
      <Navbar />
      <Main type="voluntary" />
    </div>
  );
}
