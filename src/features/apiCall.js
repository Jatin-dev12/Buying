import axios from "axios";

export const getProjects = async () => {
  try {
    const res = await axios.get("http://localhost:8081/projects/");
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};