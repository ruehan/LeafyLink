import React, { useState } from 'react';
import Upload from '../components/Upload';
import Result from '../components/Result';


const Home = () => {
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  const handleUpload = (image: File) => {
    console.log('Healthy!')
    setAnalysisResult('Healthy Plant');
  };

  return (
    <div>
      <h1>Plant Analysis App</h1>
      <Upload onUpload={handleUpload} />
      <Result result={analysisResult} />
    </div>
  );
};

export default Home