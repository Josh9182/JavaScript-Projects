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
        try {
          const rows = data.split('\n');
          const cols = rows.map((row) => row.split(','));

          if (rows.length <= 1 || cols.length <= 1) {
            setError('Data amount invalid, unable to parse. Please resubmit.');
          } else {
            setTableData(cols);
            setError('');
          }
        } catch (err) {
          setError('CSV file is invalid. Please resubmit.');
        }
      } else if (file.name.endsWith('.json')) {
        try {
          const jsonData = JSON.parse(data);
          if (jsonData.length < 1) {
            setError('Data amount invalid, unable to parse. Please resubmit.');
            setTableData([]);
          } else {
            const headers = Object.keys(jsonData[0]);
            const row_data = jsonData.map((value) =>
              headers.map((header) => value[header])
            );
            const newJSONdata = [headers, ...row_data];
            setTableData(newJSONdata);
            setError('');
          }
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

  const NavigatePage = (e) => {
    e.preventDefault();
    navigate('./Login');
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
      <div id="sign-out-container">
        <button id="sign-out-button" onClick={NavigatePage}>
          Sign Out
        </button>
      </div>
      <div id="table-container">
        {tableData.length > 0 && (
          <table>
            <thead>
              <tr>
                {tableData[0].map((value, index) => (
                  <th key={index}>{value}</th>
                ))}
              </tr>
            </thead>
            <tbody>
            {tableData.slice(1).map((row, index) => (
              <tr key={index}>
                {row.map((cell, index) => (
                  <td key={index}>{cell}</td>
                ))}
              </tr>
            ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
