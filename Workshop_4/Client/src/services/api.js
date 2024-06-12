
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;



export const fetchData = async () => {
  console.log(API_URL);
  try {
    const response = await fetch(`${API_URL}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
