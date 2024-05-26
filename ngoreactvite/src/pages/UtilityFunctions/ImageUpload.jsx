import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import PropTypes from 'prop-types';
import { getCroppedImg } from './CropUtility'; 

const ImageUpload = ({ onImageCropped }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImageSrc(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      setCroppedImage(croppedImage);
      onImageCropped(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, onImageCropped]);

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        id="image"
        name="image"
        onChange={handleImageChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        required
      />
      <div className="mt-4 w-full max-w-lg">
        {imageSrc && !croppedImage && (
          <div className="relative w-full h-64 bg-gray-200">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
            <button
              onClick={showCroppedImage}
              className="absolute bottom-4 right-4 bg-blue-500 text-white py-2 px-4 rounded"
            >
              Crop Image
            </button>
          </div>
        )}
        {croppedImage && (
          <div className="flex flex-col items-center">
            <img
              src={croppedImage}
              alt="Cropped"
              className="rounded-lg shadow-lg max-w-full h-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
};
// Add PropTypes validation
ImageUpload.propTypes = {
    onImageCropped: PropTypes.func.isRequired, // Validate onImageCropped prop as a required function
  };
export default ImageUpload;
