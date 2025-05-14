import { apiAuthLogin, apiAuthRegister, apiHostServer } from "../config";
import { apiAuthVk } from "../config/backend";

export async function loginAuth(email: string, password: string) {
  try {
    const response = await fetch(`${apiHostServer}${apiAuthLogin}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Ошибка входа. Проверьте логин и пароль."
      );
    }

    localStorage.setItem("token", data.access_token);
    localStorage.setItem("userId", data.id);
    localStorage.setItem("username", data.username);
    localStorage.setItem("statusUser", data.statusUser);
    return data;
  } catch (error) {
    console.error("Ошибка при входе:", error);
    throw error;
  }
}

export async function registerAuth(
  email: string,
  username: string,
  password: string,
  statusUser?: string
) {
  try {
    const response = await fetch(`${apiHostServer}${apiAuthRegister}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password, statusUser }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Ошибка регистрации.");
    }

    localStorage.setItem("token", data.access_token);
    localStorage.setItem("userId", data.id);
    localStorage.setItem("username", data.username);
    localStorage.setItem("statusUser", data.statusUser);
    return data;
  } catch (error) {
    console.error("Ошибка при регистрации:", error);
    throw error;
  }
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("username");
  localStorage.removeItem("statusUser");
}

export function getToken() {
  return localStorage.getItem("token");
}

export function isAuthenticated() {
  return !!getToken();
}

export async function vkAuth(email: string, vkid: string, username?: string) {
  try {
    const response = await fetch(`${apiHostServer}${apiAuthVk}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, vkid, username }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Ошибка входа через VK.");
    }

    localStorage.setItem("token", data.access_token);
    localStorage.setItem("userId", data.id);
    localStorage.setItem("username", data.username);
    localStorage.setItem("statusUser", data.statusUser);

    return data;
  } catch (error) {
    console.error("Ошибка при VK-входе:", error);
    throw error;
  }
}
