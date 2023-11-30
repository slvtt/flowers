import apiInstance from 'src/api/axios';
import { AuthTokens } from 'src/utils/helpers/authHelper';

interface LoginRequestParams {
  username: string;
  password: string;
}

export const loginRequest = (data: LoginRequestParams) =>
  apiInstance.post<AuthTokens>('', data).then(res => res.data);
