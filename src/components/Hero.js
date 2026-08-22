import React from "react";
import Icon from "./Icons";
import { profile } from "../data/resume";

export default function Hero() {
  return (
    <section className="section hero" id="about">
      <div className="hero__grid">
        <div className="hero__photo-wrap">
          <img
            className="hero__photo"
            src={process.env.PUBLIC_URL + "/" + profile.photo}
            alt={profile.name}
            width="184"
            height="184"
          />
        </div>

        <div className="hero__body">
          <p className="hero__eyebrow">{profile.location}</p>
          <h1 className="hero__name">{profile.name}</h1>
          <p className="hero__tagline">{profile.tagline}</p>

          <div className="hero__links">
            {profile.links.map((l) => (
              <a
                key={l.label}
                className={"btn" + (l.primary ? " btn--primary" : "")}
                href={l.href}
                target="_blank"
                rel="noreferrer"
              >
                <Icon name={l.icon} />
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
