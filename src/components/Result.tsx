// components/Result.tsx
import React from 'react';
import styles from '../styles/Result.module.css'; // CSS 파일 import

interface ResultProps {
  result: string | null;
}

const Result: React.FC<ResultProps> = ({ result }) => {
  return (
    <div className={styles['result-container']}>
      <h2>Analysis Result</h2>
      <p className={styles['result-text']}>{result ? `Result: ${result}` : 'No result yet.'}</p>
    </div>
  );
};

export default Result;
