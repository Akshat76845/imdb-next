// components/NavbarItem.jsx
import Link from "next/link";

const NavbarItem = ({ title, param, extraClasses = "" }) => {
  return (
    <div className={extraClasses}>
      <Link href={`/?genre=${param}`}>
        <div className="hover:text-amber-600 font-semibold">{title}</div>
      </Link>
    </div>
  );
};

export default NavbarItem;
