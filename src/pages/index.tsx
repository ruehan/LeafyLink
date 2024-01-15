import React, { useState } from 'react';
import Upload from '../components/Upload';
import styles from '../styles/Index.module.css';


const Home = () => {
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  const handleUpload = (image: File) => {
    // 추후 알고리즘 결과 삽입
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