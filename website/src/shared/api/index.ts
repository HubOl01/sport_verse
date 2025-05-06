import axios from "axios";
import { apiHostServer } from "../config";

export const api = axios.create({
  baseURL: apiHostServer,
  // timeout: 5000,
});
