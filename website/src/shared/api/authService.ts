export async function login(email: string, password: string) {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.access_token);
    }
    return data;
  }
  
  export async function register(email: string, password: string) {
    return fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }).then(res => res.json());
  }
  
  export function logout() {
    localStorage.removeItem('token');
  }
  
  export function getToken() {
    return localStorage.getItem('token');
  }
  
  export function isAuthenticated() {
    return !!getToken();
  }
  