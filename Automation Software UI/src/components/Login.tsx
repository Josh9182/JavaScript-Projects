import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading.tsx';
import './Login.scss';

const App = () => { 
  const [username, setUser] = useState<string>('');
  const [password, setPass] = useState<string>('');
  const [heading1, setHead1] = useState<string>('Sign In');
  const [heading2, setHead2] = useState<string>('Automation Software Template');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const NavigatePage = (e) => { {/* Component to transfer user if user & pass is correct */}
    e.preventDefault(); {/* Prevents any refreshing, allowing for smooth transfer */}
    if (username === 'admin' && password === 'password') {
      setLoading(true);
      setHead1('');
      setHead2('');
      setError('');
      setTimeout(() => { {/* Timeout for dashboard navigation, waits 2 seconds and shows loading element, then runs code to navigate. */}
        setLoading(false);
        navigate('/Dashboard');
      }, 2000);
    } else {
      setError(
        "Your entry doesn't match our records. Please try again. Note: passwords are case sensitive."
      );
    }
  };

  return (
    <div id="login-page">
      <div id="top-half">
        <div id="heading-container">
          <h1 id="h1-sign-in">{heading1}</h1>
          <h1 id="h1-ast">{heading2}</h1>
        </div>
      </div>
      <div id="error-container" className={error ? 'error' : ''}>
        <h1 id="error-element">{error}</h1>
      </div>
      {loading ? (
        <div id="loading-container">
          <Loading />
        </div>
      ) : (
        <form onSubmit={NavigatePage}>
          <div id="username-container">
            <label id="username-label">Username</label>
            <input
              id="username-element"
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => {
                setUser(e.target.value);
              }}
              required
            ></input>
            <div id="password-container">
              <label id="password-label">Password</label>
              <input
                id="password-element"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => {
                  setPass(e.target.value);
                }}
                required
              ></input>
            </div>
            <div id="submit-container">
              <button id="submit-element" type="submit">
                Sign In
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default App;
