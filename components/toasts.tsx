import { AxiosResponse } from 'axios';


export const parseError = (res: AxiosResponse) => {
  return `${res.status} Error\n${res.status === 600 ? res.statusText : res.data.error.length > 0 ? res.data.error : res.data.message}`;
};
