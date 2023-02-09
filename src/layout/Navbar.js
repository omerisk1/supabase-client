import Link from "next/link";
import React from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export default function Navbar() {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await supabaseClient.auth.signOut();
    router.push("/Login");
    if (error) console.log("Error signing out:", error.message);
  };

  return (
    <>
      <nav className="flex items-center justify-around flex-wrap bg-gray-800 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6 flex-grow">
          <Link href="/">
            <span className="font-semibold text-xl tracking-tight">
              Todo App
            </span>
          </Link>
        </div>

        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow space-x-6">
            <Link
              href="/list"
              className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4"
            >
              List
            </Link>
            <Link
              href="/create"
              className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4"
            >
              Create
            </Link>
          </div>
          <div className="flex gap-5 align-center">
            <p className="mt-1">sadsadasdas.gmail.com</p>
            <a
              href="#"
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-800 hover:bg-white mt-4 lg:mt-0"
              onClick={handleSignOut}
            >
              {user && user ? "Sign Out" : "Sign In"}
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
