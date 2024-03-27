import { Argon2id } from "oslo/password";
import { cookies } from "next/headers";
import { lucia } from "../../auth";
import { redirect } from "next/navigation";
import { generateId } from "lucia";
import { Users } from "@/lib/types";
import { pool } from "../../auth";

export default async function Page() {
  return (
    <>
      <h1>Create an account</h1>
      <form action={signup}>
        <label htmlFor="username">Username</label>
        <input name="username" id="username" />
        <br />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <br />
        <label htmlFor="role">Role</label>
        <input name="role" id="role" />
        <br />
        <button>Continue</button>
      </form>
    </>
  );
}

async function signup(formData: FormData): Promise<ActionResult> {
  "use server";
  const username = formData.get("username");
  // username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
  // keep in mind some database (e.g. mysql) are case insensitive
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
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    return {
      error: "Invalid password"
    };
  }

  const role = formData.get("role");

  const hashedPassword = await new Argon2id().hash(password);
  const userId = generateId(15);

  // TODO: check if username is already used
  // await pool.table("user").insert({
  //   id: userId,
  //   username: username,
  //   hashed_password: hashedPassword
  // });

  try {
    const client = await pool.connect();
    await client.query<Users>(`
      INSERT INTO users (
        id,
        username,
        hashed_password,
        role,
        funds
      )
      VALUES (
        $1, $2, $3, $4, 1000
      )
    `, [userId, username, hashedPassword, role]);

    client.release();
  } catch (error) {
    return {
      error: "Username already taken"
    };
  }

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  return redirect("/");
}


interface ActionResult {
  error: string;
}
