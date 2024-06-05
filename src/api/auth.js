import securedApi from "./config";
import publicApi from "./config";
export const authControllers = {
  loginUser: async (data) => {
    try {
      let result = await securedApi.securedApi.post(
        "authentication/login",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  dashboard: async () => {
    try {
      let result = await securedApi.securedApi.get("/dashboard");
      return result;
    } catch (error) {
      throw error;
    }
  },
  userList: async ({ page, pageSize }) => {
    try {
      let result = await securedApi.securedApi.get(
        `/user-management?pageNo=1&limit=10`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getMerchants: async () => {
    try {
      let result = await securedApi.securedApi.get("merchant/get-merchants");
      return result;
    } catch (error) {
      throw error;
    }
  },
};
