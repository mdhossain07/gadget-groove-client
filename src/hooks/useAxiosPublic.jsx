import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://gadget-groove-server.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
