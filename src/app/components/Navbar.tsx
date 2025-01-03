import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
export default function Navbar() {
  return (
    <div className="w-full relative flex items-center justify-between pt-3 max-w-2xlmx-auto sm:px-8 md:px-14">
      <Link href="/" className="font-bold text-3xl">
        Knowledge<span className="text-primary">Hub</span>
      </Link>

      

      <ModeToggle />
    </div>
  );
}
