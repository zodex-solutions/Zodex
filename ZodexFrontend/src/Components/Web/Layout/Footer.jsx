import React from "react";
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import Heading from "../Text/heading";
import { padding } from "../../../Common/tailwindStyles";

const icons = { Facebook, Instagram, Twitter, Linkedin, Youtube };

const footerLinks = {
  social: [
    { name: "Facebook", href: "https://facebook.com", icon: "Facebook" },
    { name: "Instagram", href: "https://instagram.com", icon: "Instagram" },
    { name: "Twitter", href: "https://twitter.com", icon: "Twitter" },
    { name: "LinkedIn", href: "https://linkedin.com", icon: "Linkedin" },
    { name: "YouTube", href: "https://youtube.com", icon: "Youtube" },
  ],
  buildWith: [
    { label: "Social Technologies", href: "/social-technologies" },
    { label: "Zodex Horizon", href: "/horizon" },
    { label: "AI", href: "/ai" },
  ],
  news: [{ label: "Blog", href: "/blog" }],
  developer: [
    { label: "Start", href: "/start" },
    { label: "Zodex Horizon Creator Program", href: "/creator-program" },
  ],
};

const Footer = () => {
  return (
    <footer className={`bg-black/40   ${padding.x}`}>
      <div className=" p-6 py-10 border-[0.5px] border-b-0 shadow-2xl xl:container mx-auto rounded-t-4xl border-gray-50/15 backdrop-blur-2xl relative">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Logo & Social */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Heading line1={"Zodex"} css={"text-white"} type={"heading"} />
            </div>
            <div className="flex space-x-4 text-gray-300">
              {footerLinks.social.map(({ name, href, icon }) => {
                const Icon = icons[icon];
                return (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-100"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Build with Zodex */}
          <div>
            <h4 className="font-semibold text-xl text-gray-300 mb-3">
              Build with Zodex
            </h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              {footerLinks.buildWith.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="hover:text-gray-400">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* News */}
          <div>
            <h4 className="font-semibold text-xl text-gray-300 mb-3">News</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              {footerLinks.news.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="hover:text-gray-400">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Developer Programs */}
          <div>
            <h4 className="font-semibold text-gray-300 text-xl mb-3">
              Developer Programs
            </h4>
            <ul className="space-y-2  text-gray-300 text-sm">
              {footerLinks.developer.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="hover:text-gray-400">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col md:flex-row justify-end items-end text-gray-300 text-sm">
          <p>© {new Date().getFullYear()} Zodex</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
