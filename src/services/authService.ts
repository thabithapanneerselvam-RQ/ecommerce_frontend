export const loginUser = async (values: {
  username: string;
  password: string;
}) => {
  if (values.username === "admin" && values.password === "1234") {
    return { token: "12345" };
  } else {
    throw new Error("Invalid username or password");
  }
};
