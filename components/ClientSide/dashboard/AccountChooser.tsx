import MandatoryAccountCard from "../landing/MandatoryAccountCard";
import VoluntaryAccountCard from "../landing/VoluntaryAccountCard";
import PrincipalAccountCard from "../landing/PrincipalAccountCard";

interface AccountDetailsCardProps {
  type: string;
}

export default function AccountChooser({ type }: AccountDetailsCardProps) {
  if (type === "mandatory") {
    return <MandatoryAccountCard />;
  }

  if (type === "voluntary" || type === "voluntary-data") {
    return <VoluntaryAccountCard type={type} />;
  }

  if (type === "principal") {
    return <PrincipalAccountCard />;
  }

  // Default to mandatory if type is not recognized
  return <MandatoryAccountCard />;
}
