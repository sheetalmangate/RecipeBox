import { JwtPayload, jwtDecode } from "jwt-decode";

declare module "jwt-decode" {
  export interface JwtPayload {
    username: string;
  }
}

class AuthService {
  getProfile() {
    const token = this.getToken();
    const decodedToken = jwtDecode<JwtPayload>(token);
    return decodedToken;
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string) {
    const decodedToken = jwtDecode<JwtPayload>(token);
    return !!decodedToken.exp && decodedToken.exp * 1000 < Date.now();
  }

  getToken(): string {
    const loggedUser = localStorage.getItem("recipe_box_token") || "";
    return loggedUser;
  }

  login(idToken: string) {
    localStorage.setItem("recipe_box_token", idToken);
  }

  logout() {
    localStorage.removeItem("recipe_box_token");
  }
}

export default new AuthService();
