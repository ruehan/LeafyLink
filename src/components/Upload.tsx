import React, {useState, ChangeEvent} from 'react';
import styles from '../styles/Upload.module.css';

interface UploadProps{
    onUpload: (image: File) => void;
}

const Upload : React.FC<UploadProps> = ({ onUpload }) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [previewImage, setPreviewImage] = useState<string | null>(null)

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
        if(selectedImage){
            alert(`Image Uploaded! [${selectedImage.name}]`)
            onUpload(selectedImage)
        }
    }

    return (
        <div className={styles['upload-container']}>
            <input type="file" accept="image/*" onChange={handleImageChange} className={styles['upload-input']} />
            {previewImage && <img src={previewImage} alt="Preview" style={{ maxWidth: '300px', maxHeight: '600px', marginTop: '10px' }} />}
            <button onClick={handleUpload} className={styles['upload-button']}>Upload Image</button>
        </div>
    )
}

export default Upload;