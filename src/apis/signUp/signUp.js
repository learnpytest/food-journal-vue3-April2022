import { helper } from "../helper";
export default {
  signUp: async ({email, account, password}) => {
    return await helper.post("/auth/register", {
      email,
      password,
    });
  },
};
