import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <section className="main-container">
      <div className="grid grid-cols-1  lg:grid-cols-2 lg:gap-10 py-4">
        <div className="flex gap-1">
          <p className="text-sm">
            Developed & Designed By{" "}
            <span>
              <Link
                href="https://github.com/i-anniie"
                target="_blank"
                className="font-semibold hover:text-black"
              >
                Anwesh
              </Link>
            </span>
          </p>
        </div>
        <div className="flex items-center justify-end gap-2 ">
          <p className="text-sm">
            ©{new Date().getFullYear()} Home Quest. All Rights Reserved.
          </p>
          <div className="flex items-center gap-2 text-sm border-l pl-2 border-black">
            <Link href="/privacy-policy">
              <h1 className="">Privacy Policy</h1>
            </Link>
            <Link href="terms-and-conditions">
              <h1 className="">Terms & Conditions</h1>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
