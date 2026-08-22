import React from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Resume from "./components/Resume";
import Icon from "./components/Icons";
import { profile } from "./data/resume";

export default function App() {
  return (
    <div className="page" id="top">
      <Nav />
      <main className="container">
        <Hero />
        <Resume />
      </main>
      <footer className="footer">
        <div className="container footer__inner">
          <span>© {new Date().getFullYear()} Jack Jiang</span>
          <div className="footer__links">
            {profile.links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
              >
                <Icon name={l.icon} size={15} />
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
