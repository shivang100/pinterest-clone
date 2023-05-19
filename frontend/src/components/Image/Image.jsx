import React, { useState } from "react";
import ImageModel from "./ImgModel.jsx";

const Image = ({img, setUpdateUI }) => {
  const [model, setModel] = useState(false);
  const handleClick = () => {
    setModel(true);
  }
  return (
    <React.Fragment>
      {
        !model ?
          <div className="flex w-1/3 flex-wrap">
            <div className="w-full p-1 md:p-2 flex items-center transition duration-500 ease-in-out hover:scale-95 overflow-hidden cursor-pointer">
              <img
                onClick={handleClick}
                alt="gallery"
                className="block rounded-lg object-cover object-center overflow-hidden"
                src={img.imageUrl}
                loading="lazy"
              />
            </div>
          </div>
          :
          <ImageModel img={img} setModel={setModel} setUpdateUI={setUpdateUI} />
      }
    </React.Fragment >
  )
};

export default Image;
