import { useState, useEffect, useRef } from 'react';
import domtoimage from 'dom-to-image';
import PicPreview from './components/PicPreview';
import axios from 'axios';

export default function App() {
  const [images, setImages] = useState([]);
  const [memeText, setMemeText] = useState({
    topText: '',
    bottomText: ''
  });
  const [randomImage, setRandomImage] = useState(0);
  const [customImage, setCustomImage] = useState();

  const uploadedImage = useRef(null);
  const input1 = useRef(null);
  const input2 = useRef(null);

  const getAllImages = async () => {
    try {
      const { data } = await axios.get(`https://api.imgflip.com/get_memes`);
      setImages(data.data.memes);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getAllImages();
  }, []);

  const handleMemeText = (e) => {
    e.preventDefault();
    setMemeText({ ...memeText, [e.target.name]: e.target.value });
  };

  const handleRandom = () => {
    setRandomImage(Math.floor(Math.random() * images.length));
  };

  const handleUpload = (e) => {
    setCustomImage(URL.createObjectURL(e.target.files[0]));
  };

  const downloadMeme = () => {
    domtoimage
      .toJpeg(uploadedImage.current, { quality: 0.95 })
      .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'my-image-name.jpeg';
        link.href = dataUrl;
        link.click();
      });
  };

  const handleReset = () => {
    setRandomImage(0);
    setMemeText({});
    setCustomImage();
    input1.current.value = '';
    input2.current.value = '';
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <input
        ref={input1}
        onChange={handleMemeText}
        type="text"
        name="topText"
        placeholder="Top text"
        className="mb-2 p-2 border border-gray-300 rounded w-full max-w-sm"
      />
      <input
        ref={input2}
        onChange={handleMemeText}
        type="text"
        name="bottomText"
        placeholder="Bottom text"
        className="mb-4 p-2 border border-gray-300 rounded w-full max-w-sm"
      />
      <button
        onClick={handleRandom}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Random
      </button>
      <input
        type="file"
        id="input"
        multiple
        onChange={handleUpload}
        className="mb-4"
      />
      <div
        className="relative w-full max-w-lg bg-white p-4 rounded shadow-md"
        ref={uploadedImage}
      >
        {images.length > 0 && (
          <img
            src={customImage ? customImage : images[randomImage].url}
            alt={images[randomImage].name}
            className="w-full h-auto rounded"
          />
        )}
        <p className="absolute top-2 left-1/2 transform -translate-x-1/2 text-white text-xl font-bold">
          {memeText?.topText}
        </p>
        <p className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white text-xl font-bold">
          {memeText?.bottomText}
        </p>
      </div>
      <button
        onClick={downloadMeme}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Save
      </button>
      <button
        onClick={handleReset}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Reset
      </button>

      {images.length > 0 && (
        <PicPreview
          images={images}
          randomImage={randomImage}
          setRandomImage={setRandomImage}
        />
      )}
    </div>
  );
}
