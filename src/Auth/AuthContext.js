// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get('http://localhost:9081/user'); // Adjust the URL as per your API
//         setUser(response.data);
//       } catch (error) {
//         console.error("Error fetching the user", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   const login = async (credentials) => {
//     try {
//       const response = await axios.post('http://localhost:9081/login', credentials); // Adjust the URL as per your API
//       setUser(response.data);
//     } catch (error) {
//       console.error("Login error", error);
//       throw error; // Rethrow error for handling in Login component
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     // Additional logic for logging out, e.g., clearing local storage, invalidating tokens, etc.
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export { AuthContext, AuthProvider };
