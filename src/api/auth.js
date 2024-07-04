import axios from "axios";
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
  // userList: async ({ page, pageSize, name, status }) => {
  //   try {
  //     const params = new URLSearchParams();

  //     params.append("pageNo", page === 0 ? 1 : page);
  //     params.append("limit", pageSize);

  //     if (name !== undefined) {
  //       params.append("name", name);
  //     }
  //     if (status !== undefined) {
  //       params.append("status", status);
  //     }

  //     let result = await securedApi.securedApi.get(
  //       `/user-management?${params.toString()}`
  //     );
  //     return result;
  //   } catch (error) {
  //     throw error;
  //   }
  // },
  // userList: async ({ page, pageSize, name, status }) => {
  //   try {
  //     let query = [];
  //     if (name !== undefined) {
  //       query.push(`name:${name}`);
  //     }
  //     if (status !== undefined) {
  //       query.push(`status:${status}`);
  //     }

  //     const queryString = query.length > 0 ? `&query={${query.join(",")}}` : "";

  //     const pageNo = page === 0 ? 1 : page;
  //     const url = `/user-management?pageNo=${pageNo}&limit=${pageSize}${queryString}`;

  //     let result = await securedApi.securedApi.get(url);
  //     return result;
  //   } catch (error) {
  //     throw error;
  //   }
  // },

  userList: async ({ page, pageSize, name, status }) => {
    try {
      // Build the query object
      const query = {};
      if (name !== undefined) {
        query.name = name;
      }
      if (status !== undefined) {
        query.status = status;
      }

      // Create the URL
      const pageNo = page === 0 ? 1 : page;
      const url = `/user-management?pageNo=${pageNo}&limit=${pageSize}&query=${encodeURIComponent(
        JSON.stringify(query)
      )}`;

      let result = await securedApi.securedApi.get(url);
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
  addBusiness: async (body) => {
    try {
      let result = await securedApi.securedApi.post("/business", body);
      return result;
    } catch (error) {
      throw error;
    }
  },
  getBusiness: async () => {
    try {
      let result = await securedApi.securedApi.get(
        "/business?pageNo=1&limit=10&query=undefined"
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  addUser: async (data) => {
    try {
      let result = await securedApi.securedApi.post(
        "user-management/add-user",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  uploadImage: async (data) => {
    try {
      let result = await securedApi.securedApi.post("file/upload", data);
      return result;
    } catch (error) {
      throw error;
    }
  },
  updatePassword: async (data) => {
    try {
      let result = await securedApi.securedApi.put(
        `user-management/update-password/${data.id}`,
        {
          password: data.password,
          confirmPassword: data.confirmPassword,
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  editUser: async ({ id, data }) => {
    try {
      let result = await securedApi.securedApi.put(
        `user-management/user/${id}`,
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getUserInfo: async (id) => {
    try {
      let result = await securedApi.securedApi.get(
        `user-management/${id}/details`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  deleteUser: async (id) => {
    try {
      let result = await securedApi.securedApi.delete(
        `/user-management?_id=${id}`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  addnotes: async (body, id) => {
    try {
      let result = await securedApi.securedApi.put(
        `/business/note/${id}`,
        body
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
};
