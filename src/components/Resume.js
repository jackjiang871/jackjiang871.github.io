import React from "react";
import { education, experience, research, skills } from "../data/resume";

function Entry({ heading, subheading, meta, place, bullets }) {
  return (
    <article className="entry">
      <div className="entry__head">
        <div>
          <h4 className="entry__heading">{heading}</h4>
          {subheading && <p className="entry__subheading">{subheading}</p>}
          {meta && <p className="entry__meta">{meta}</p>}
        </div>
        <div className="entry__aside">
          {place && <span className="entry__place">{place}</span>}
        </div>
      </div>
      {bullets && (
        <ul className="entry__bullets">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}
    </article>
  );
}

export default function Resume() {
  return (
    <section className="section" id="resume">
      <div className="section__head">
        <h2 className="section__title">Resume</h2>
      </div>

      <div className="resume">
        <div className="resume__block">
          <h3 className="resume__label">Education</h3>
          <div className="resume__entries">
            {education.map((e) => (
              <Entry
                key={e.school}
                heading={e.school}
                subheading={e.detail}
                place={e.place}
                meta={e.dates}
              />
            ))}
          </div>
        </div>

        <div className="resume__block">
          <h3 className="resume__label">Experience</h3>
          <div className="resume__entries">
            {experience.map((job) => (
              <Entry
                key={job.company}
                heading={job.company}
                subheading={job.title}
                meta={job.dates + " · " + job.stack}
                place={job.place}
                bullets={job.bullets}
              />
            ))}
          </div>
        </div>

        <div className="resume__block">
          <h3 className="resume__label">Research</h3>
          <div className="resume__entries">
            {research.map((r) => (
              <Entry key={r.org} heading={r.org} meta={r.dates} bullets={r.bullets} />
            ))}
          </div>
        </div>

        <div className="resume__block">
          <h3 className="resume__label">Skills</h3>
          <div className="skills">
            {skills.map((s) => (
              <div className="skills__row" key={s.group}>
                <span className="skills__group">{s.group}</span>
                <div className="skills__tags">
                  {s.items.map((i) => (
                    <span className="tag" key={i}>
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
