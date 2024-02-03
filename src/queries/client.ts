import server from "../config/axiosInstance";

export const getClients = async () => {
  try {
    const client = await server.get("/clients");
    return client;
  } catch (error) {
    console.error(error);
  }
};
