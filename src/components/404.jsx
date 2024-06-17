// pages/404.js (or any page where you use useSearchParams())
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import NavbarItem from "../components/NavbarItem"; // Adjust the path as per your project structure

export default function Custom404() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>\
      <Suspense fallback={<div>Loading...</div>}>
        <ComponentUsingSearchParams />
      </Suspense>
    </div>
  );
}

function ComponentUsingSearchParams() {
  const searchParams = useSearchParams();
  const genre = searchParams.get("genre");

  // Your component logic here
  return (
    <div>
      <p>Current genre: {genre}</p>
      {/* Example: Render your NavbarItem or other components using genre */}
      <NavbarItem title="Action" param="action" extraClasses="custom-class" />
    </div>
  );
}
