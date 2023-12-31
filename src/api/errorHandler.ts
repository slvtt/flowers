import axios from 'axios';
import { errorAlert } from 'src/ui/Alert/errorAlert';

export const errorHandler = (err: unknown) => {
  if (axios.isAxiosError(err)) {
    if (!err.config?.headers['Skip-Error']) {
      errorAlert(err.response?.status);
    }
    throw err;
  } else {
    console.error(err);
  }
};
