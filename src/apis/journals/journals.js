import {
  helper
} from "../helper";

export default {
  getAll: () => {
    return helper.get("/journals");
  },
  create: (payload) => {
    return helper.post("/journals", payload);
  },
  update: (id, payload) => {
    return helper.put("/journals/" + id, payload);
  },
};