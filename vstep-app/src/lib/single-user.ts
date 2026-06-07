type SingleUserConfig = {
  email: string;
  password: string;
  fullName: string;
};

export function getSingleUserConfig(): SingleUserConfig {
  const email = process.env.AUTH_USER_EMAIL;
  const password = process.env.AUTH_USER_PASSWORD;
  const fullName = process.env.AUTH_USER_FULL_NAME ?? "VSTEP Student";

  if (!email || !password) {
    throw new Error(
      "Missing AUTH_USER_EMAIL or AUTH_USER_PASSWORD. Set these values in .env.local.",
    );
  }

  return { email, password, fullName };
}
