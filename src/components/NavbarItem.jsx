"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function NavbarItem({ title, param, extraClasses = "" }) {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Suspense>
      {() => {
        const genre = searchParams.get("genre");

        return (
          <div className={`${extraClasses}`}>
            <Link
              className={`hover:text-amber-600 font-semibold ${
                genre === param
                  ? " decoration-4 decoration-amber-500 rounded-lg "
                  : "underline underline-offset-8 mr-16"
              }`}
              href={`/?genre=${param}`}
            >
              {title}
            </Link>
          </div>
        );
      }}
    </Suspense>
  );
}
