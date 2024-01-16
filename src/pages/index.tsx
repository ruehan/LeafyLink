import React, { useState } from 'react';
import Upload from '../components/Upload';
import styles from '../styles/Index.module.css';


const Home = () => {
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  const handleUpload = async (image: File) => {
    // 추후 알고리즘 결과 삽입

    console.log(image)

    const formData = new FormData();
    formData.append('images', image);

    const response = await fetch('/api/uploadImage', {
      method: 'POST',
      body: formData,
    })

    if(response.ok){
      const result = await response.json();
      console.log('Image Upload Result', result)
    }else{
      console.error('Image Upload Failed')
    }

    setAnalysisResult('Healthy Plant');
  };

  return (
    <div className={styles.mainContainer}>
      <h3>ReafyLink</h3>
      <Upload onUpload={handleUpload} />
    </div>
  );
};

export default Home