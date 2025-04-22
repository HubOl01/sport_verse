import axios from "axios";
import { apiHost } from "../config";

export const api = axios.create({
  baseURL: apiHost,
  timeout: 5000,
});
