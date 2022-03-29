import axios from "axios";

export function getUsers() {
  return axios.get(
    "https://randomuser.me/api?results=25&seed=moussa&nat=gb,us&inc=nat,picture,cell,login,name,email"
  );
}
