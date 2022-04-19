import React, { useEffect } from "react";
import Footer from "../Footer";
import "../../styles/Resume.css";

function Reflection() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="resume_section_header reflection_head">
        <h1>Reflection</h1>
      </div>

      <div className="resume_section reflection">
        <hr />
        <p>
          When I started this Bootcamp, I have personal expectations of what is
          going to happen. I can tell you right now that did not was like I
          expected, was better. The number of things that I learned through this
          course in an accurate description was beyond my original expectations.
        </p>
        <p>
          I need to say that I made all the possible mistakes that a rookie can
          do. I did so many, that I think that I created a few new ones. But I
          feel very proud of all my humble achievements.
        </p>
        <p>
          I passed through a lot of challenges. I remember waking up at 3:00 am
          to work only one hour and then continuing with my regular
          responsibilities. To repeat the same situation the next day. But, I
          continue anyway.
        </p>
        <p>
          I am amazed at how much hard work this type of job requires. Is a
          time-consuming elaborated task. I remove my hat, before all of you
          developers. I recognize this to all of you.
        </p>
        <p>
          This was the best academic experience in a long time. The support that
          I got was tremendous. Do I recommend this course to others? definitely
          YES!
        </p>

        <br />
        <hr />
        <p className="last_signature">Thank you all! Jose Figueroa / 2022</p>
      </div>
      <Footer />
    </>
  );
}

export default Reflection;
