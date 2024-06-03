export default function PicPreview({ images, setRandomImage }) {
    const handleClick = (value) => {
      setRandomImage(images.indexOf(value));
    };
  
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="one-image-container cursor-pointer border border-gray-300 rounded overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            onClick={() => handleClick(image)}
          >
            <img
              src={image.url}
              alt={image.name}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    );
  }
  