import { Argon2id } from "oslo/password";
import { cookies } from "next/headers";
import { lucia } from "../../auth";
import { redirect } from "next/navigation";
import { pool } from "../../auth";
import { Users } from "@/lib/types";

export default async function Page() {
  return (
    <>
      <h1>Sign in</h1>
      <form action={login}>
        <label htmlFor="username">Username</label>
        <input name="username" id="username" />
        <br />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <br />
        <button>Continue</button>
      </form>
    </>
  );
}

async function login(formData: FormData): Promise<ActionResult> {
  "use server";
  const username = formData.get("username");
  
  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return {
      error: "Invalid username"
    };
  }
  const password = formData.get("password");
  if (typeof password !== "string" || password.length < 6 || password.length > 255) {
    return {
      error: "Invalid password"
    };
  }

  const client = await pool.connect();
  const { rows } = await client.query<Users>(`
    SELECT * FROM users
    WHERE username = $1
  `, [username.toLowerCase()]);

  client.release();

  const existingUser: Users = rows[0];

  if (!existingUser) {
    // NOTE:
    // Returning immediately allows malicious actors to figure out valid usernames from response times,
    // allowing them to only focus on guessing passwords in brute-force attacks.
    // As a preventive measure, you may want to hash passwords even for invalid usernames.
    // However, valid usernames can be already be revealed with the signup page among other methods.
    // It will also be much more resource intensive.
    // Since protecting against this is non-trivial,
    // it is crucial your implementation is protected against brute-force attacks with login throttling etc.
    // If usernames are public, you may outright tell the user that the username is invalid.
    return {
      error: "Incorrect username or password"
    };
  }

  const validPassword = await new Argon2id().verify(existingUser.hashed_password, password);
  if (!validPassword) {
    return {
      error: "Incorrect username or password"
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  return redirect("/");
}


interface ActionResult {
  error: string;
}
