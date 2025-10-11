import bcrypt from "bcryptjs";
import { USERS } from "../auth/users";           // adjust path if different
import type { LoginParams } from "../types";

function makeToken(userId: string): string {
    const rnd = crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2);
    return `${userId}.${rnd}.${Date.now()}`;
}

export async function loginLocal(username: string, password: string): Promise<LoginParams> {
    const uid = (username || "").trim();
    if (!uid || !password) {
        console.log("invalid");
        throw new Error("Username and password are required.");
    }

    const user = USERS.find(u => u.id.toLowerCase() === uid.toLowerCase());
    if (!user) {
        console.log("invalid");
        throw new Error("Invalid credentials.");
    }

    const ok = await bcrypt.compare(password, user.hash);
    if (!ok) {
        console.log("invalid");
        throw new Error("Invalid credentials.");
    }

    console.log("valid");
    return { token: makeToken(user.id) };
}
