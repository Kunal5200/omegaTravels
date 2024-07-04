import securedApi from "./config";
export const listingController = {
  getCurrency: async () => {
    try {
      let result = await securedApi.securedApi.get("/currency/ui");
      return result;
    } catch (error) {
      throw error;
    }
  },
  getBusinessName: async () => {
    try {
      let result = await securedApi.securedApi.get("/business/get-names");
      return result;
    } catch (error) {
      throw error;
    }
  },
  getBusinessDetails: async (id) => {
    try {
      let result = await securedApi.securedApi.get(`/business/details/${id}`);
      return result;
    } catch (error) {
      throw error;
    }
  },
};
