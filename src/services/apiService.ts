import axios, { AxiosResponse } from 'axios';

// Define response types for OAuth2
export interface OAuth2Response {
  token_type: string;
  expires_in: number;
  access_token: string;
}

// Define response types for Home API
interface HomeResponse {
  status: string;
  result: {
    greeting: string;
    name: string;
    saldo: number;
    point: number;
    qrcode: string;
    banner: string[];
  };
}

// Define response types for Menu API
interface MenuResponse {
  status: string;
  result: {
    categories: Array<{
      category_name: string;
      menu: Array<{
        name: string;
        description: string;
        photo: string;
        price: number;
      }>;
    }>;
  };
}

// Base URL and credentials from environment variables
const API_BASE = process.env.REACT_APP_API_BASE_URL || '';
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID || '';
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET || '';
const USERNAME = process.env.REACT_APP_LOGIN_USERNAME || '';
const PASSWORD = process.env.REACT_APP_LOGIN_PASSWORD || '';

/**
 * Login using OAuth2
 */
export const login = async (): Promise<OAuth2Response> => {
  try {
    const response: AxiosResponse<OAuth2Response> = await axios.post(
      `${API_BASE}/oauth/token`,
      new URLSearchParams({
        grant_type: 'password',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        username: USERNAME,
        password: PASSWORD,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

/**
 * Fetch Home data
 */
export const fetchHomeData = async (token: string): Promise<HomeResponse> => {
  try {
    const response: AxiosResponse<HomeResponse> = await axios.get(`${API_BASE}/api/home`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Failed to fetch home data:', error);
    throw error;
  }
};

/**
 * Fetch Menu data
 */
export const fetchMenuData = async (token: string): Promise<MenuResponse> => {
  try {
    const response: AxiosResponse<MenuResponse> = await axios.post(
      `${API_BASE}/api/menu`,
      { show_all: 1 },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Failed to fetch menu data:', error);
    throw error;
  }
};