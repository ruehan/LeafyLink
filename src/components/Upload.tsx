
import React, { useState, ChangeEvent } from 'react';
import ImageEditor from '../components/ImageEditor';
import styles from '../styles/Upload.module.css';

const Upload: React.FC<{ onUpload: (image: File) => void }> = ({ onUpload }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [showImageEditor, setShowImageEditor] = useState(false);

  const dataURItoBlob = (dataURI: string) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setSelectedImage(file);
    } else {
      setPreviewImage(null);
      setSelectedImage(null);
    }
  };

  const handleUpload = () => {
    if (editedImage) {
      // 이미지가 편집되었으면 편집된 이미지를 Blob 형태로 변환하여 업로드
      const editedBlob = dataURItoBlob(editedImage);
      const editedFile = new File([editedBlob], 'edited_image.jpeg', { type: 'image/jpeg' });

      alert(`Image Uploaded! [Edited Image]`);
      onUpload(editedFile);
    } else if (selectedImage) {
      alert(`Image Uploaded! [${selectedImage.name}]`);
      onUpload(selectedImage);
    }
  };

  const handleEditButtonClick = () => {
    setEditedImage(null); // 수정 전에 초기화
    setShowImageEditor(true);
  };

  const handleImageEditorSave = (croppedImage: string) => {
    setEditedImage(croppedImage);
    // 이미지 편집 모드 종료
    setShowImageEditor(false);
  };

  const handleImageEditorCancel = () => {
    // 이미지 편집 모드 종료
    setShowImageEditor(false);
  };

  return (
    <div className={styles.uploadContainer}>
      <div className={styles.uploadSection}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
          <div className={styles.editedPreviewContainer}>
            {editedImage ? (
                <img src={editedImage} alt="Edited Preview" className={styles.editedPreviewImage} />
              
            ) : previewImage ? (
              <img src={previewImage} alt="Selected Preview" className={styles.selectedPreviewImage} />
            ) : null}
            </div>
        <button onClick={handleUpload} className={styles.uploadButton}>
          Upload Image
        </button>
        <button onClick={handleEditButtonClick} className={styles.editButton}>
          Edit Image
        </button>
      </div>

      <div className={styles.editorSection}>
        <div className={styles.selectedImagePreview}>
          {showImageEditor && selectedImage && (
            <div className={styles.imageEditorContainer}>
              <ImageEditor image={previewImage || ''} onSave={handleImageEditorSave} onCancel={handleImageEditorCancel} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Upload;
