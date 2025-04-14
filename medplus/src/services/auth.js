export const getToken = () => {
  const userData = localStorage.getItem('user') || sessionStorage.getItem('user');
  if (userData) {
    try {
      const { token } = JSON.parse(userData);
      return token;
    } catch {
      return null;
    }
  }
  return null;
};

export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;
  
  try {
    const userData = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'));
    if (!userData) return false;
    
    const oneDay = 24 * 60 * 60 * 1000;
    return Date.now() - userData.timestamp < oneDay;
  } catch {
    return false;
  }
};

export const login = async (credentials) => {
  try {
    // Simulate fetching stored user data
    const storedUserData = JSON.parse(localStorage.getItem('user')) || {};
    
    // Check if the provided credentials match the stored data
    if (
      (credentials.email && credentials.email === storedUserData.email) &&
      (credentials.password && credentials.password === storedUserData.password)
    ) {
      return storedUserData.token; // Return the token if credentials match
    }
    
    throw new Error('Invalid email or password');
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('user');
  sessionStorage.removeItem('user');
  window.location.href = '/login';
};
