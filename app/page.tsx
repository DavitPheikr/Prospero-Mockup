import Button from "@/components/ui/Button";
import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: "2rem",
        padding: "2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexDirection: "column",
          width: "300px",
        }}
      >
        <Link href="/account">
          <Button>Landing</Button>
        </Link>

        <Link href="/account/mandatory/dashboard">
          <Button>My Mandatory Account</Button>
        </Link>

        <Link href="/account/voluntary-data/dashboard">
          <Button>My PreMade Voluntary Account</Button>
        </Link>

        <Link href="/account/principal/dashboard">
          <Button>My Principal Account</Button>
        </Link>
      </div>
    </div>
  );
}
