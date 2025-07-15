import Link from "next/link";
import Button from "./Button";
import { MoveLeft } from "lucide-react";

interface BackToProps {
  href: string;
  text: string;
}

export default function BackTo({ href, text }: BackToProps) {
  return (
    <Link href={href}>
      <Button variant="secondary">
        <MoveLeft
          style={{ verticalAlign: "middle", marginRight: 8 }}
          size={20}
        />
        {text}
      </Button>
    </Link>
  );
}
