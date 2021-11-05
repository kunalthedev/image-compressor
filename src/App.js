import React, { useState } from "react";
import { readAndCompressImage } from "browser-image-resizer";
import "./App.css";

function App() {
  const [inputImg, setInputImg] = useState();
  const [compimg, setcompimg] = useState();
  const [img, setimage] = useState();
  const [image2, setimage2] = useState();
  const imageConfig = {
    quality: 0.2,
    maxWidth: 800,
    maxHeight: 600,
    autoRotate: false,
  };
  const onChange = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      setInputImg(file);
      let base64Image = await convertToBase64(file);
      setimage(base64Image);
    } catch (e) {
      console.log(e);
    }
  };
  function readableBytes(bytes) {
    var i = Math.floor(Math.log(bytes) / Math.log(1024)),
      sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    return (bytes / Math.pow(1024, i)).toFixed(2) * 1 + " " + sizes[i];
  }
  const onClick = async () => {
    try {
      let image = await readAndCompressImage(inputImg, imageConfig);
      setcompimg(image);
      let base64Image = await convertToBase64(image);
      setimage2(base64Image);
    } catch (e) {
      console.log(e);
    }
  };
  const convertToBase64 = (blob) => {
    return new Promise((resolve) => {
      var reader = new FileReader();
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  };
  const onClickHandler = () => {
    setInputImg();
    setimage();
    setimage2();
  };
  return (
    <div className="App">
      <div className="wrap">
        <h1>browser-image-resizer</h1>
        <h2>Select a local file to compress</h2>
        <div className="display-wrapper">
          <div className="image-selector">
            {inputImg && <p>{readableBytes(inputImg.size)}</p>}
            <label htmlFor="imagepicker" className="image-selector">
              {img ? (
                <img src={img} alt="" className="profile" />
              ) : (
                <p>CLick here to select image</p>
              )}
            </label>
            <input
              type="file"
              name="image"
              id="imagepicker"
              accept="image/*"
              multiple={false}
              onChange={(e) => onChange(e)}
              hidden
            />
          </div>
          {image2 ? (
            <p></p>
          ) : (
            <button onClick={() => onClick()}>Convert</button>
          )}

          {image2 ? (
            <div className="image-selector">
              {compimg && <p>{readableBytes(compimg.size)}</p>}
              <img
                src={image2}
                alt="compress-output"
                className="output-image"
              />
            </div>
          ) : (
            <p className="image-selector">Output</p>
          )}
        </div>
        {image2 && (
          <button onClick={() => onClickHandler()}>Convert Next</button>
        )}
      </div>
    </div>
  );
}

export default App;
