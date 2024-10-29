import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './Login.tsx';

const Dashboard = () => {
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const FileUpload = (e) => {
    const file = e.target.files[0];
    const freader = new FileReader();

    freader.onload = (e) => {
      const data = e.target.result;

      if (file.name.endsWith('.csv')) {
        const rows = data.split('\n');
        const cols = rows.map((row) => row.split(','));
        setTableData(cols);
        setError('');
      } else if (file.name.endsWith('.json')) {
        try {
          const jsonData = JSON.parse(data);
          setTableData(jsonData);
          setError('');
        } catch (err) {
          setError('JSON file is invalid. Please resubmit.');
        }
      } else {
        setError('File type invalid. Please resubmit.');
        setTableData([]);
      }
    };
    freader.readAsText(file);
  };
  return (
    <div id="dashboard-container">
      <div id="dashboard-banner">
        <h1 id="dashboard-logo">AST</h1>
      </div>
      <div id="error-container">
        <h1 id="error-element">{error}</h1>
      </div>
      <div id="input-container">
        <input type="file" accept=".csv, .json" onChange={FileUpload} />
      </div>
    </div>
  );
};

export default Dashboard;
