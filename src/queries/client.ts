import { Client, Prisma } from "@prisma/client";
import server from "../config/axiosInstance";
import { ENDPOINTS } from "../constants";

export const getClients = async () => {
  try {
    const client = await server.get(ENDPOINTS.clients);
    return client;
  } catch (error) {
    console.error(error);
  }
};

export const createClient = async (
  clientData: Prisma.ClientCreateWithoutOrdersInput
) => {
  try {
    const client = await server.post<Client>(ENDPOINTS.clients, clientData);
    return client;
  } catch (error) {
    console.error(error);
  }
};
