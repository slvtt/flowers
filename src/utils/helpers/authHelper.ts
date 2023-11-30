import Cookies from 'js-cookie';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

export const setAuthTokens = (tokens: AuthTokens): boolean => {
  if (!tokens) {
    return false;
  }

  const { access_token, refresh_token } = tokens;
  if (access_token && refresh_token) {
    Cookies.set(ACCESS_TOKEN_KEY, access_token, { expires: 7 });
    Cookies.set(REFRESH_TOKEN_KEY, refresh_token, { expires: 7 });
    return true;
  }
  return false;
};

export const getAuthTokens = (): AuthTokens => {
  const access_token = Cookies.get(ACCESS_TOKEN_KEY) || '';
  const refresh_token = Cookies.get(REFRESH_TOKEN_KEY) || '';

  return { access_token, refresh_token };
};

export const removeAuthTokens = () => {
  Cookies.remove(ACCESS_TOKEN_KEY);
  Cookies.remove(REFRESH_TOKEN_KEY);
};
