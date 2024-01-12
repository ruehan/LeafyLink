import React, {useState, ChangeEvent} from 'react';
import styles from '../styles/Upload.module.css';

import ImageEditor from './ImageEditor';

interface UploadProps{
    onUpload: (image: File) => void;
}

const Upload : React.FC<UploadProps> = ({ onUpload }) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [previewImage, setPreviewImage] = useState<string | null>(null)

    const [showImageEditor, setShowImageEditor] = useState(false);

    const [editedImage, setEditedImage] = useState<string | null>(null);

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
        const file = e.target.files?.[0]

       if(file){
        const imageUrl = URL.createObjectURL(file);
        setPreviewImage(imageUrl);
        setSelectedImage(file);
       }else{
        setPreviewImage(null);
        setSelectedImage(null);
       }

        
    }

    const handleUpload = () => {
        if (editedImage) {
            // 이미지가 편집되었으면 편집된 이미지를 업로드
            const editedBlob = dataURItoBlob(editedImage);
            const editedFile = new File([editedBlob], 'edited_image.jpeg', { type: 'image/jpeg' });

            alert(`Image Uploaded! [${editedImage}]`);
            onUpload(editedFile)

          } else if (selectedImage) {
            // 이미지가 편집되지 않았으면 원본 이미지를 업로드
            alert(`Image Uploaded! [${selectedImage.name}]`);
            onUpload(selectedImage)
          }
    }

    const handleEditButtonClick = () => {
        setShowImageEditor(true);
      };
    
      const handleImageEditorSave = (croppedImage: string) => {
        
        setEditedImage(croppedImage)
        console.log('Cropped Image:', croppedImage);
    
        // alert('Cropped Image: ' + croppedImage);
    
        setShowImageEditor(false);
      };
    
      const handleImageEditorCancel = () => {
        setShowImageEditor(false);
      };

    return (
        <div className={styles['upload-container']}>
            <input type="file" accept="image/*" onChange={handleImageChange} className={styles['upload-input']} />
            {previewImage && <img src={previewImage} alt="Preview" style={{ maxWidth: '300px', maxHeight: '600px', marginTop: '10px' }} />}
            {editedImage && (
                <div>
                <h3>Edited Preview</h3>
                <img src={editedImage} alt="Edited Preview" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                </div>
            )}

            <button onClick={handleUpload} className={styles['upload-button']}>Upload Image</button>

            <button onClick={handleEditButtonClick} className={styles['edit-button']}>Edit Image</button>

            {/* 이미지 편집 모달 */}
            {showImageEditor && selectedImage && (
                <div className={styles['image-editor-container']}>
                <ImageEditor image={previewImage || ''} onSave={handleImageEditorSave} onCancel={handleImageEditorCancel} />
                </div>
            )}
        </div>
    )
}

export default Upload;
