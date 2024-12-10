export const fetchData = async (array_data) => {
  const URL = 'https://localhost:5001';
  const endpoint = `${URL}/api/data`;

  const AC = new AbortController(); /* AbortController instance */
  const timeout = setTimeout(() => { /* Initiate 7 second fail safe timer */
    AC.abort();
  }, 7000);

  try { /* "try" block to run fetch POST request */
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(array_data),
      signal: AC.signal, /* Link AbortController to try block */
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Fetch request failed: ${errorMessage}`);
    } else {
      return await response.json(); /* Returns global response value for backend acceptance */
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Fetch request timed out.');
    }
    throw error;
  } finally {
    clearTimeout(timeout); /* Clear timer to remove possible timer stacking i.e chaos */
  }
};
