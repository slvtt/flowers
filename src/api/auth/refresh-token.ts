import apiInstance from 'src/api/axios';

export const refreshTokenRequest = (token: string) =>
  apiInstance
    .post('', { refresh_token: token }, { skipAuthRefresh: true } as any)
    .then(res => {
      const access = res.data.access_token;
      const refresh = res.data.refresh_token;

      return { access_token: access, refresh_token: refresh };
    });
