import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './Login.tsx';
import ProgressBar from './ProgressBar.tsx';

const Dashboard = () => {
  const [tableData, setTableData] = useState([]);
  const [errorStatus, setError] = useState<string>('');
  const [buttonVisibility, setButtonVisibility] = useState<boolean>(false);
  const [clickStatus, setClick] = useState<boolean>(false);
  const [loadingDuration, setLoadingDuration] = useState<number>(0);
  const navigate = useNavigate();

  const FileUpload = (e) => {
    setTableData([]);
    setError('');
    setButtonVisibility(false);
    setClick(false);
    setLoadingDuration(0);

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
            setButtonVisibility(true);
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
            const cols = Object.keys(jsonData[0]);
            const rows = jsonData.map((value) => cols.map((col) => value[col]));
            const newJSONdata = [cols, ...rows];
            setTableData(newJSONdata);
            setError('');
            setButtonVisibility(true);
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

  const buttonClicked = () => {
    setClick(true);
  };

  const NavigatePage = (e) => {
    e.preventDefault();
    navigate('./Login');
  };

  useEffect(() => {
    if (!clickStatus) {
      return;
    }
    const duration = tableData.length * 8;
    setLoadingDuration(duration);
  }, [clickStatus]);

  return (
    <div id="dashboard-container">
      <div id="dashboard-banner">
        <h1 id="dashboard-logo">AST</h1>
        <div id="sign-out-container">
          <button id="sign-out-button" onClick={NavigatePage}>
            Sign Out
          </button>
        </div>
      </div>

      <div id="error-container">
        <h1 id="error-element">{errorStatus}</h1>
      </div>
      <div id="input-container">
        <input type="file" accept=".csv, .json" onChange={FileUpload} />
        {tableData.length > 0 && buttonVisibility ? (
          <div>
            <div id="button-container">
              <button onClick={buttonClicked}>Process Data</button>
            </div>
            <div id="table-container">
              <table id="data-table">
                <thead id="dt-header">
                  <tr id="header-row">
                    {tableData[0].map((value, index) => (
                      <th key={index} id="header-cell">
                        {value}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody id="table-body">
                  {tableData.slice(1).map((row, rowIndex) => (
                    <tr key={rowIndex} id="body-row">
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} id="body-cell">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {clickStatus && (
                <div>
                  <ProgressBar duration={loadingDuration} />
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Dashboard;
