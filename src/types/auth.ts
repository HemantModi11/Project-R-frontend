export interface User {
    username: string;
    email: string;
  }
  
export interface LoginResponse {
accessToken: string;
user: { username: string; email: string };
}