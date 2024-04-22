import React from "react";
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble, BsTwitch, BsYoutube} from 'react-icons/bs';

export default function FooterComp() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link to="/" className="font-bold text-4xl ">
              <span className="px-2 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Travel{" "}
              </span>
              Buddy
            </Link>
          </div>
          <div className="grid grid-col-2 gap-8 mt-5 sm: grid-cols-3 sm:gap-5">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="/About"
                  target="_blank"
                  relationship="noopener norefferer">
                  Travel Buddy
                </Footer.Link>
              </Footer.LinkGroup>

              <Footer.LinkGroup col>
                <Footer.Link
                  href="/Contact"
                  target="_blank"
                  relationship="noopener norefferer">
                  Contact Us
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
            <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.instagram.com/"
                  target="_blank"
                  relationship="noopener norefferer">
                  Instagram
                </Footer.Link>
              </Footer.LinkGroup>

              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://twitter.com/"
                  target="_blank"
                  relationship="noopener norefferer">
                  X
                </Footer.Link>
              </Footer.LinkGroup>

              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.linkedin.com/"
                  target="_blank"
                  relationship="noopener norefferer">
                  LinkedIn
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
            <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="#">
                  Privacy Policy
                </Footer.Link>
              </Footer.LinkGroup>

              <Footer.LinkGroup col>
                <Footer.Link
                  href="#">
                  Terms & Conditions 
                </Footer.Link>
              </Footer.LinkGroup>

            </div>  
          </div>
        </div>
        <Footer.Divider/>
        <div className="w-full sm:flex sm:items-center sm:justify-between">
            <Footer.Copyright href="#" by="Travel Buddy." year= {new Date().getFullYear()}/>
            <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                <Footer.Icon href="#" icon={BsFacebook}></Footer.Icon>
                <Footer.Icon href="#" icon={BsTwitter}></Footer.Icon>
                <Footer.Icon href="#" icon={BsInstagram}></Footer.Icon>
                <Footer.Icon href="#" icon={BsGithub}></Footer.Icon>
                <Footer.Icon href="#" icon={BsDribbble}></Footer.Icon>
                <Footer.Icon href="#" icon={BsTwitch}></Footer.Icon>
                <Footer.Icon href="#" icon={BsYoutube}></Footer.Icon>
            </div>
                 
        </div>
      </div>
    </Footer>
  );
}
