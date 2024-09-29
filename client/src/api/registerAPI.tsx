import { UserLogin } from "../interfaces/UserLogin";

const register = async (body: UserLogin) => {
  try {
    const response = await fetch("/auth/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //   Authorization: `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify(body),
    });
    const data = response.json();

    if (!response.ok) {
      throw new Error("invalid API response, check network tab!");
    }

    return data;
  } catch (err) {
    console.log("Error fro Account Creation: ", err);
    return Promise.reject("Could not create account");
  }
};

export { register };
