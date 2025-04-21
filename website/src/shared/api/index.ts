import axios from "axios";
import { apiHostServer } from "../config/backend";

export const api = axios.create({
  baseURL: apiHostServer,
  timeout: 5000,
});
