import React from "react";

import { Footer } from "flowbite-react";
import Link from "next/link";
const MyFooter = () => {
  return (
    <Footer className="bg-teal-200 rounded-0">
      <div className="w-full">
        <div className="grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4">
          <div>
            <Link
              href="/"
              className="text-[18px] mb-5 mt-[-10px] font-bold italic text-blue-700 flex gap-1 items-end"
            >
              <div className="block w-[35px] h-[35px]">
                <img className="img-fluid" src="/logo.png" alt="" />
              </div>
              GoodReads
            </Link>
            <Footer.LinkGroup col className="text-black">
              <Footer.Link href="#">Shop</Footer.Link>
              <Footer.Link href="#">favourite</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title className="text-blue-700" title="help center" />
            <Footer.LinkGroup col className="text-black">
              <Footer.Link href="#">Discord Server</Footer.Link>
              <Footer.Link href="#">Twitter</Footer.Link>
              <Footer.Link href="#">Facebook</Footer.Link>
              <Footer.Link href="#">Contact Us</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title className="text-blue-700" title="legal" />
            <Footer.LinkGroup col className="text-black">
              <Footer.Link href="#">Privacy Policy</Footer.Link>
              <Footer.Link href="#">Licensing</Footer.Link>
              <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title className="text-blue-700" title="download" />
            <Footer.LinkGroup col className="text-black">
              <Footer.Link href="#">iOS</Footer.Link>
              <Footer.Link href="#">Android</Footer.Link>
              <Footer.Link href="#">Windows</Footer.Link>
              <Footer.Link href="#">MacOS</Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default MyFooter;
