import axios from "axios";

const instance = axios.create({
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export default instance;
