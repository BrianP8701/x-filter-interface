// src/app/api/authService.ts
import axios from 'axios';

import { generateBackendUrl } from '@/app/api/apiUtils';

export const signupUser = async (username: string, x_username: string, password: string) => {
  try {
    console.log('url: ' + generateBackendUrl('api/signup'))
    const id = username
    const response = await axios.post(generateBackendUrl('api/signup/'), {
      x_username,
      password,
      id
    });
    localStorage.setItem('accessToken', response.data.access_token);
    localStorage.setItem('refreshToken', response.data.refresh_token);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error response:', error.response);
      throw error; // Rethrow to handle it at a higher level if necessary
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};


// Example of storing tokens after sign-in
export const signinUser = async (username: string, password: string) => {
  const id = username;
  const response = await axios.post(generateBackendUrl(`api/signin/`), {
    id,
    password,
  });
  // Store tokens in local storage
  localStorage.setItem('accessToken', response.data.access_token);
  localStorage.setItem('refreshToken', response.data.refresh_token);
  console.log('access token: ' + response.data.access_token)
  console.log('refresh token: ' + response.data.refresh_token)
  return response.data;
};

// Example of making an authenticated request
export const isAuthenticated = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    console.log('access token in isAuthenticated: ' + accessToken)
    const response = await axios.post(generateBackendUrl('api/secure-endpoint/'), {}, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('response.data in isAuthenticated: ' + response.data)
    return response.data;
  } catch (error) {
    console.error('Error accessing secure endpoint:', error);
    throw error;
  }
};