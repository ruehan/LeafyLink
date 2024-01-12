import React, {useState, ChangeEvent} from 'react';
import styles from '../styles/Upload.module.css';

interface UploadProps{
    onUpload: (image: File) => void;
}

const Upload : React.FC<UploadProps> = ({ onUpload }) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null)

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        setSelectedImage(file || null)
    }

    const handleUpload = () => {
        if(selectedImage){
            console.log(selectedImage)
            alert(`Image Uploaded! [${selectedImage.name}]`)
        }
    }

    return (
        <div className={styles['upload-container']}>
            <input type="file" accept="image/*" onChange={handleImageChange} className={styles['upload-input']} />
            <button onClick={handleUpload} className={styles['upload-button']}>Upload Image</button>
        </div>
    )
}

export default Upload;