import React, { useState } from 'react';
import Upload from '../components/Upload';
// import Result from '../components/Result';


const Home = () => {
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  const handleUpload = (image: File) => {
    // 이미지 업로드 후 결과를 받아오는 비동기 함수 호출
    // 예: analyzeImage(image).then(result => setAnalysisResult(result));
    // (analyzeImage 함수는 백엔드와 통신하여 이미지를 분석하는 함수)
    // 임시로 결과를 설정하는 코드로 대체
    setAnalysisResult('Healthy Plant');
  };

  return (
    <div>
      <h1>Plant Analysis App</h1>
      <Upload onUpload={handleUpload} />
      {/* <Result result={analysisResult} /> */}
    </div>
  );
};

export default Home