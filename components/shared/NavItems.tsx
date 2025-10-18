'use client';
import { headerLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavItems = () => {
    const pathName = usePathname();

  return (
    <div>
      <ul className="md:flex-between flex w-full flex-col items-start gap-6 md:flex-row">
        {headerLinks.map((link) => {
            const isActive = pathName === link.route;
          return (
            <li
                key={link.route}
                className={`${isActive ? 'text-primary-500' : ''} flex-center p-medium font-medium-16 whitespace-nowrap`}
            >
              <Link href={link.route}>{link.label}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NavItems;
