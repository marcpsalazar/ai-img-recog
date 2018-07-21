import axios from "axios";

export default {
  postImage: function(data) {
    return axios.post("/api/image-upload", data);
  },
};