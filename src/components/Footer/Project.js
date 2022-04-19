import React, { useState, useEffect } from "react";
import "../../styles/Project.css";
import Footer from "../Footer";

function Project() {
  const [cycle, setcycle] = useState(0);
  const [allimages, setallimages] = useState("");
  const [imagenames, setimagenames] = useState("");

  useEffect(() => {
    function importAll(imagefiles) {
      let images = {};
      imagefiles.keys().map((item, index) => {
        images[item.replace("./", "")] = imagefiles(item);
      });
      return images;
    }

    const images = importAll(
      require.context("../../images/project", false, /\.(png|jpe?g|svg)$/)
    );

    setallimages(images);
    setimagenames(Object.keys(images));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function doImageCycle(action, sequence) {
    let largo = imagenames.length;
    //console.log(imagenames.length);
    switch (action) {
      case "NEXT":
        if (sequence >= largo - 1) {
          setcycle(0);
        } else {
          setcycle(sequence + 1);
        }
        break;

      case "PREVIOUS":
        if (sequence <= 0) {
          setcycle(largo - 1);
        } else {
          setcycle(sequence - 1);
        }
        break;
    }
  }

  return (
    <>
      <div className="pcarousel_info">
        <h1>Project Description</h1>
      </div>
      <div className="pcarousel">
        <div className="parrow-container absolute-center">
          <a
            className="parrow arrow-left"
            title="Previous"
            onClick={() => {
              doImageCycle("PREVIOUS", cycle);
            }}
          ></a>
        </div>
        <img src={allimages[imagenames[cycle]]} alt="cardimage" />
        <div className="parrow-container">
          <a
            className="parrow arrow-right"
            title="Next"
            onClick={() => {
              doImageCycle("NEXT", cycle);
            }}
          ></a>
        </div>
      </div>
      <div className="pcarousel_info">
        {cycle + 1} of {imagenames.length}
      </div>
      <Footer />
    </>
  );
}

export default Project;
