import {
  helper
} from "../helper"
export default {
  signIn: async (email, password) => {
    return await helper.post("/auth/login", {
      email,
      password
    })
  }
}