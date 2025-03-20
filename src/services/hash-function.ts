import argon2 from "argon2";

export class PasswordService {
  static async passwordHash(password: string): Promise<string> {
    try {
      return await argon2.hash(password);
    } catch (error) {
      console.error("Error hashing password:", error);
      throw new Error("Error hashing password");
    }
  }

  static async verifyHash(hash: string, password: string): Promise<boolean> {
    try {
      return await argon2.verify(hash, password);
    } catch (error) {
      console.error("Error verifying password hash:", error);
      throw new Error("Error verifying password hash");
    }
  }
}
