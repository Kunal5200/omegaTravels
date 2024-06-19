import securedurlApi from "./config";
export const listingController = {
  getCurrency: async () => {
    try {
      let result = await securedurlApi.securedurlApi.get("/api/currency/ui");
      return result;
    } catch (error) {
      throw error;
    }
  },
};
