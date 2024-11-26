export const fetchData = async (array_data) => {
  const URL = 'https://localhost:5001';
  const endpoint = `${URL}/api/data`;

  const AC = new AbortController();
  const timeout = setTimeout(() => {
    AC.abort();
  }, 7000);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(array_data),
      signal: AC.signal,
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Fetch request failed: ${errorMessage}`);
    } else {
      return await response.json();
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Fetch request timed out.');
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
};
