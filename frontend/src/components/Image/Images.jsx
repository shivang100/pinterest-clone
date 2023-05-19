import React, { useState, useEffect } from "react";
import Image from "./Image";
import { getAllImages } from "../../api/ImageAPI";

const Images = () => {
  const [images, setImages] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);

  useEffect(() => {
    getAllImages(setImages);
  }, [updateUI]);

  return (
    images.length ?
      <React.Fragment>
        <section className="overflow-hidden text-neutral-700">
          <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
            <div className="-m-1 flex flex-wrap md:-m-2">
              {
                images.map((img) => {
                  return (
                    <Image
                      key={img.imageUrl}
                      img={img}
                      setUpdateUI={setUpdateUI}
                    />
                  );
                }
                )
              }
            </div>
          </div>
        </section>
      </React.Fragment>
      :
      <React.Fragment>
        <div className="text-center text-xl font-bold mt-5">
          Please Wait, while the Images load
        </div>
      </React.Fragment>
  );
};

export default Images;
