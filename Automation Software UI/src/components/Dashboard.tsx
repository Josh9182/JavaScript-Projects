import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar.tsx';
import './Dashboard.scss';

const Dashboard = () => {
  const [tableData, setTableData] = useState([]);
  const [errorStatus, setError] = useState<string>('');
  const [buttonVisibility, setButtonVisibility] = useState<boolean>(false);
  const [menuSlide, setMenuSlide] = useState<boolean>(false);
  const [clickStatus, setClick] = useState<boolean>(false);
  const [loadingDuration, setLoadingDuration] = useState<number>(0);
  const navigate = useNavigate();

  const FileUpload = (e) => {
    {
      /* Ensuring all useState variables are transparent in order to remove possible visual errors */
    }
    setTableData([]);
    setError('');
    setMenuSlide(false);
    setButtonVisibility(false);
    setClick(false);
    setLoadingDuration(0);

    const file = e.target.files[0];
    const freader = new FileReader();

    freader.onload = (e) => {
      {
        /* Onload event handler used to create a processing agent for the data, this will run after the file reading is complete. */
      }
      const data = e.target.result;

      if (file.name.endsWith('.csv')) {
        try {
          const rows = data.split('\n');
          const cols = rows.map((row) => row.split(','));
          {
            /* Since CSV files can't be nested they can be easily parsed via splitting based off a "," */
          }

          if (rows.length <= 1 || cols.length <= 1) {
            setError('Data amount invalid, unable to parse. Please resubmit.');
          } else {
            setTimeout(() => {
              setTableData(cols);
            }, 1700);

            setError('');
            setButtonVisibility(true);
            {
              /* Error checking to see if data exists, if so then a table can be created based off columns, errors dissapear, and button options become visible. */
            }
            setMenuSlide(true);
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
            {
              /* Accessing first row of JSON data, gathering all keys to transform into column headers. */
            }
            const rows = jsonData.map((value) => cols.map((col) => value[col]));
            const newJSONdata = [cols, ...rows];
            {
              /* 2D Array creation, organizing rows by their original columns so it can be turned into a table. */
            }
            setTimeout(() => {
              setTableData(newJSONdata);
            }, 1700);

            setError('');
            setButtonVisibility(true);
            setMenuSlide(true);
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
    {
      /* Read the imported file as text, allowing for the processing agent to manipulate and structure the table. */
    }
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

  useEffect(() => {
    if (!clickStatus) {
      return;
    }
  });

  return (
    <div id="dashboard-container">
      <div id="banner-container">
        <div id="dashboard-banner">
          <h1 id="dashboard-logo">AST</h1>
          <div id="sign-out-container">
            <button id="sign-out-button" onClick={NavigatePage}>
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div id="error-container">
        <h1 id="error-element">{errorStatus}</h1>
      </div>
      <div id="bottom-container">
        <div className={`input-container ${menuSlide ? 'slide-left' : ''}`}>
          <input type="file" accept=".csv, .json" onChange={FileUpload} />
          {buttonVisibility ? (
            <div id="button-container">
              <button onClick={buttonClicked}>Process Data</button>
            </div>
          ) : null}
          {clickStatus && (
            <ProgressBar
              className={`ProgressBar ${clickStatus} ? grow: ""`}
              duration={loadingDuration}
            />
          )}
        </div>
        <div className={`table-container`}>
          {tableData.length > 0 ? (
            <div>
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
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
