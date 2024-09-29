import { JwtPayload, jwtDecode } from "jwt-decode";
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
    const loggedUser = localStorage.getItem("id_token") || "";
    return loggedUser;
  }

  login(idToken: string) {
    localStorage.setItem("id_token", idToken);
  }

  logout() {
    localStorage.removeItem("id_token");
  }
}

export default new AuthService();
