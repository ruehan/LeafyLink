import React, { useState } from 'react';
import Result from '../components/Result';


const ResultPage = () => {
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  const handleUpload = (image: File) => {
    // 추후 알고리즘 결과 삽입
    setAnalysisResult('Healthy Plant');
  };

  return (
    <div>
      <h1>ReafyLink</h1>
      <Result result={analysisResult} />
    </div>
  );
};

export default ResultPage