"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import { LogOutIcon } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const { signOut } = useClerk();

  const handleLogoClick = () => {
    router.push("/");
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/signin");
  };

  return (
    <header className="w-full bg-base-200">
      <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex-1">
          <Link href="/" onClick={handleLogoClick}>
            <div className="btn btn-ghost normal-case text-2xl font-bold tracking-tight cursor-pointer">
              Cloudinary Showcase
            </div>
          </Link>
        </div>
        <div className="flex-none">
          <button onClick={handleSignOut} className="btn btn-ghost btn-circle">
            <LogOutIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
