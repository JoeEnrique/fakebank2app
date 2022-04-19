import React, { useEffect } from "react";
import "../../styles/Resume.css";
import Footer from "../Footer";
import CCNA from "../../images/resume/CCNA_200.png";
import CompTIA from "../../images/resume/CompTIA_200.png";
import MCTS from "../../images/resume/MCTS_200.png";
import JAVA from "../../images/resume/OracleJAVA_200.png";

function Resume() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="resume_section_header">
        <h1>RESUME</h1>
      </div>

      <div className="resume_section">
        <h2>PROFILE</h2>
        <hr />
        <p>
          IT Engineer, Technician, Developer, and Customer Service-oriented
          professional with over 15 years of experience focusing on technology
          solutions. Also, it serves as a liaison to non-technical shareholders
          and customers.
        </p>
      </div>
      <div className="resume_section">
        <h2>EXPERIENCE</h2>
        <hr />
        <div className="resume_subsection">
          <h2>Warehouse IT Support Engineer</h2>
          <h3>
            Wayfair | Apr 2019 - Feb 2020 // pandemic // Nov 2020 - Present
          </h3>
          <ul>
            <li>
              Provide support to the daily transaction data related to HighJump
              and Tangerine Systems. Using tools like SQL Server Management
              Studio (SSMS)
            </li>
            <li>
              Provide Support to Handheld, Desktops, Laptops, Printers,
              Switches, IP Phones. MDM (Mobile Device Management, using Intune
              and Airwatch)
            </li>
            <li>Contact Suppliers if necessary.</li>
            <li>
              Shipments documentation adjustments, for routes mostly for FedEx
              and some occasions for UPS.
            </li>
            <li>
              Provide Support to new applications and continuous software
              changes.
            </li>
          </ul>
        </div>
        <div className="resume_subsection">
          <h2>Field Service Technician / Web Developer</h2>
          <h3>Techvantex | Nov 2018 - Present</h3>
          <ul>
            <li>
              Assist Business Owners of Restaurants with the implementation of
              their Online Ordering Systems.
            </li>
            <li>
              Provide Support to their equipment as need it. (Desktops, Laptops,
              Printers, POS)
            </li>
            <li>
              Provide support with the development of Websites using Beaver
              Builder on WordPress
            </li>
          </ul>
        </div>
        <div className="resume_subsection">
          <h2>Distribution Center IT Technician</h2>
          <h3>SanMar | Otc 2013 - Otc 2018</h3>
          <ul>
            <li>
              Responsible for the technology assets for the good operation and
              flow of the Distribution Center.
            </li>
            <li>
              Provide Support to Handheld, Desktops, Laptops, Printers,
              Switches, IP Phones. Teach users about how to handle the
              equipment.
            </li>
            <li>Contact Suppliers if necessary.</li>
            <li>Handle Inventory and disposals.</li>
            <li>
              Develop JAVA applications in order to create solutions to
              operations issues.
            </li>
          </ul>
        </div>
      </div>
      <div className="resume_section">
        <h2>EDUCATION</h2>
        <hr />
        <div className="resume_subsection">
          <h2>Master's Networking</h2>
          <h3>Interamerican University of Puerto Rico</h3>
          <ul>
            <li>
              Master in Computer Science, Major in Networking and Security
            </li>
          </ul>
        </div>
        <div className="resume_subsection">
          <h2>Bachelor of Science in Business</h2>
          <h3>University of Phoenix</h3>
          <ul>
            <li>
              Bachelor of Science in Business, Major in e-Business and
              Management
            </li>
          </ul>
        </div>
      </div>
      <div className="resume_section">
        <h2>SKILLS & CERTIFICATIONS</h2>
        <hr />
        <div className="resume_subsection">
          <h2>Skills, Other Technical Certifications and Experiences</h2>
          <ul>
            <li>Bilingual – Spanish / English</li>
            <li>
              Technical Education Teacher - Department of Education of Puerto
              Rico, 2008
            </li>
            <li>IT Warehouse, Education Service Center, 2005</li>
          </ul>
          <div className="resume_subsection_certifications">
            <img src={CCNA} alt="certification-image" />
            <img src={CompTIA} alt="certification-image" />
            <img src={JAVA} alt="certification-image" />
            <img src={MCTS} alt="certification-image" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Resume;
