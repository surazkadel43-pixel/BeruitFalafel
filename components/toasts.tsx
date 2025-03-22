import { AxiosResponse } from 'axios';


// export const parseError = (res: AxiosResponse) => {
//   return `${res.status} Error\n${res.status === 600 ? res.statusText : res.data.error.length > 0 ? res.data.error : res.data.message}`;
// };

export const parseError = (res: AxiosResponse) => {
 
 if (res.data.message) {
    return `${res.status} Error\n${res.data.message}`;
  }
  else if(res.data.error) {
    return `${res.status} Error\n${res.data.error}`;
  }
   else {
    return `${res.status} Error\n${res.statusText || 'An error occurred'}`;
  }
};
