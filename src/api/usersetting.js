import securedApi from "./config";
export const UserSettingControllers = {
  getModules: async () => {
    try {
      let result = await securedApi.securedApi.get(
        "modules/?pageNo=1&limit=50"
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  addModules: async (data) => {
    try {
      let result = await securedApi.securedApi.post("modules", data);
      return result;
    } catch (error) {
      throw error;
    }
  },
  getSubmodules: async (data) => {
    try {
      let result = await securedApi.securedApi.get(
        `modules/submodules/${data}`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
};
