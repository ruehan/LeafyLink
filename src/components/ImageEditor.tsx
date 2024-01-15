// components/ImageEditor.tsx
import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';

interface ImageEditorProps {
  image: string;
  onSave: () => void;
  onCancel: () => void;
}

const ImageEditor: React.FC<ImageEditorProps> = ({ image, onSave, onCancel }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const saveCroppedImage = useCallback(() => {
    if (croppedAreaPixels) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const imageElement = new Image();

      imageElement.src = image;
      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      if (ctx) {
        ctx.drawImage(
          imageElement,
          croppedAreaPixels.x,
          croppedAreaPixels.y,
          croppedAreaPixels.width,
          croppedAreaPixels.height,
          0,
          0,
          croppedAreaPixels.width,
          croppedAreaPixels.height
        );

        const croppedImage = canvas.toDataURL('image/jpeg');
        onSave(croppedImage); // 이 부분에서 onSave를 호출하여 편집된 이미지 데이터를 전달합니다.
      }
    }
  }, [croppedAreaPixels, image, onSave]);

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%'}}>
        <div style={{ position: 'relative', width: '100%', height: '300px' }}>
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
      </div>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <button
          onClick={saveCroppedImage}
          style={{
            padding: '10px 15px',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Save
        </button>
        <button
          onClick={onCancel}
          style={{
            padding: '10px 15px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            marginLeft: '10px',
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ImageEditor;
