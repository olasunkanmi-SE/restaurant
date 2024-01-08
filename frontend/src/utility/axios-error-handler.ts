import axios from "axios";

export const handleAxiosError = (error: any) => {
  const { response, message, request } = error;
  switch (true) {
    case axios.isCancel(error):
      console.error("Request canceled:", message);
      break;
    case error.response:
      console.error("Response data:", response.data);
      console.error("Response status:", response.status);
      console.error("Response headers:", response.headers);
      break;
    case error.request:
      console.error("No response received:", request);
      break;
    default:
      console.error("Error during request setup:", message);
      break;
  }
  console.error("Error config:", error.config);
  throw error;
};
