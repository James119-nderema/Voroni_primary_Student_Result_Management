export const loginUser = async (username, password) => {
  try {
    const response = await fetch('http://localhost:9921/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      console.log('Login response:', data);

      // Check for tokens and save them securely
      if (data.tokens && data.tokens.accessToken && data.tokens.refreshToken) {
        console.log('Tokens received:', data.tokens);
        localStorage.setItem('accessToken', data.tokens.accessToken);
        localStorage.setItem('refreshToken', data.tokens.refreshToken);
      } else {
        console.warn('Tokens not found in the response');
      }

      return data;
    } else {
      const text = await response.text();
      console.log('Login response (text):', text);
      return { errorMessage: text };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { errorMessage: 'Network error occurred' };
  }
};

export const registerUser = async (username, password, firstName, lastName) => {
  try {
    const response = await fetch('http://localhost:9921/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, firstName, lastName }),
    });
    
    // Check if the response is JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      console.log('Register response:', data);
      return data;
    } else {
      // Handle text response
      const text = await response.text();
      console.log('Register response (text):', text);
      // For a successful text response like "User registered Successfully"
      if (response.ok) {
        return { username, firstName, lastName }; // Create a mock profile to indicate success
      }
      return { errorMessage: text };
    }
  } catch (error) {
    console.error('Register error:', error);
    return { errorMessage: 'Network error occurred' };
  }
};

// Function to add authentication headers
export const addAuthHeaders = (headers = {}) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {

    return {
      ...headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }
  return headers;
};
