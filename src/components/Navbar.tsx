"use client";
import React, { useState } from "react";
import Link from "next/link";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <nav className="flex items-center justify-between w-full py-4 px-4 text-lg text-gray-700 bg-white">
        <div className="-ml-6">
          <Link href="/">
            <img
              src="/image/glycowatchLogo.svg"
              alt="GlycoWatch Logo"
              width={150}
              height={32}
            />
          </Link>
        </div>
        <div className="mr-5">
          <button
            className="h-6 w-6 cursor-pointer md:hidden block"
            onClick={toggleMenu}
          >
            <img src="/image/icon-menu.png" alt="Menu" width={24} height={24} />
          </button>
        </div>
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } fixed inset-0 bg-white z-10 md:relative md:bg-transparent md:flex md:items-center md:w-auto`}
          id="menu"
        >
          <div className="flex justify-between items-center w-full md:hidden p-4">
            <Link href="/">
              <img
                src="/image/glycowatchLogo.svg"
                alt="GlycoWatch Logo"
                width={150}
                height={32}
              />
            </Link>
            <button onClick={toggleMenu} className="h-6 w-6">
              <img
                src="/image/icon-close.png"
                alt="Close"
                width={24}
                height={24}
              />
            </button>
          </div>
          <ul className="flex flex-col items-center gap-4 mt-4 text-gray-700 md:flex-row md:mt-0">
            <li>
              <Link
                className="md:p-4 py-2 block hover:text-purple-400"
                href="#"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                className="md:p-4 py-2 block hover:text-purple-400"
                href="#"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                className="md:p-4 py-2 block hover:text-purple-400"
                href="#"
              >
                Customers
              </Link>
            </li>
            <li>
              <Link
                className="md:p-4 py-2 block hover:text-purple-400"
                href="#"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                className="md:p-4 py-2 block hover:text-purple-400 text-purple-500"
                href="#"
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
