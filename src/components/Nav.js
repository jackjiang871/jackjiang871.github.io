import React from "react";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "resume", label: "Resume" },
];

export default function Nav() {
  const [active, setActive] = React.useState("about");
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      // the section whose top has most recently passed the nav bar wins
      const line = window.scrollY + 140;
      let current = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= line) current = s.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={"nav" + (scrolled ? " nav--scrolled" : "")}>
      <div className="nav__inner">
        <a className="nav__brand" href="#top">
          <span className="nav__mark">JJ</span>
          <span className="nav__name">Jack Jiang</span>
        </a>
        <nav className="nav__links" aria-label="Sections">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={"#" + s.id}
              className={"nav__link" + (active === s.id ? " is-active" : "")}
            >
              {s.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
