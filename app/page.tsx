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
      <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>
        Prospero Account Management Demo
      </h1>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexDirection: "column",
          width: "300px",
        }}
      >
        <Link href="/create-account">
          <Button>Create New Account</Button>
        </Link>

        <Link href="/my-account/mandatory">
          <Button>My Mandatory Account</Button>
        </Link>

        <Link href="/my-account/voluntary">
          <Button>My Voluntary Account</Button>
        </Link>
      </div>
    </div>
  );
}
