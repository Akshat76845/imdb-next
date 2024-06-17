"use client"
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function NavbarItem({ title, param, extraClasses = "" }) {
  const searchParams = useSearchParams();
  const genre = searchParams.get("genre");

  return (
    <div className={extraClasses}>
      <Suspense fallback={<div>Loading...</div>}>
        <Link
          href={`/?genre=${param}`}
          className={`hover:text-amber-600 font-semibold ${
            genre === param
              ? "decoration-4 decoration-amber-500 rounded-lg"
              : "underline underline-offset-8 mr-16"
          }`}
        >
          {title}
        </Link>
      </Suspense>
    </div>
  );
}
