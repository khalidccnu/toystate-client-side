import React, { useState } from "react";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import {
  Fullscreen,
  Slideshow,
  Thumbnails,
  Zoom,
} from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import imgAtlandice from "../assets/gallery/atlandice.jpg";
import imgAvengers from "../assets/gallery/avengers-infinity-war-thanos-rising.jpg";
import imgColorShift from "../assets/gallery/color-shift-puzzle-ball.jpg";
import imgTin from "../assets/gallery/leftcenterright-in-tin.jpg";
import imgLegends from "../assets/gallery/legends-of-andor-base.jpg";
import imgPigs from "../assets/gallery/pass-the-pigs.jpg";
import imgPit from "../assets/gallery/pit.jpg";
import imgSnake from "../assets/gallery/serpent-snake-puzzle.jpg";

const photos = [
  { src: imgAtlandice, width: 800, height: 600 },
  { src: imgAvengers, width: 1600, height: 900 },
  { src: imgColorShift, width: 800, height: 600 },
  { src: imgTin, width: 1600, height: 900 },
  { src: imgLegends, width: 800, height: 600 },
  { src: imgPigs, width: 800, height: 600 },
  { src: imgPit, width: 1600, height: 900 },
  { src: imgSnake, width: 1600, height: 900 },
];

const Gallery = () => {
  const [index, setIndex] = useState(-1);

  return (
    <section className="py-10 text-center">
      <div className="container">
        <h3 className="font-bold text-2xl mb-10">Gallery</h3>
        <PhotoAlbum
          photos={photos}
          layout="masonry"
          columns={(containerWidth) => {
            if (containerWidth < 400) return 1;
            if (containerWidth < 768) return 2;
            return 4;
          }}
          spacing="5"
          onClick={({ index }) => setIndex(index)}
        />
        <Lightbox
          slides={photos}
          index={index}
          open={index >= 0}
          close={() => setIndex(-1)}
          plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
        />
      </div>
    </section>
  );
};

export default Gallery;
