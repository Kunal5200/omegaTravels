import securedApi from "./config";
export const editcontroller = {
  updateBusiness: async (id, body) => {
    try {
      let result = await securedApi.securedApi.put(`/business/${id}`, body);
      return result;
    } catch (error) {
      throw error;
    }
  },
};
