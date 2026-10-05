"use server";
import bcrypt from "bcryptjs";
import prisma from "@/app/lib/prisma";
export type SignUpState = { error?: string; success?: boolean };
export async function signUp(_prevState: SignUpState, formData: FormData): Promise<SignUpState> {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim().toLowerCase();
  const password = formData.get("password")?.toString();
  const confirmPassword = formData.get("confirmPassword")?.toString();
  if (!name || !email || !password || !confirmPassword) return { error: "กรุณากรอกข้อมูลให้ครบถ้วน" };
  if (password.length < 6) return { error: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร" };
  if (password !== confirmPassword) return { error: "รหัสผ่านไม่ตรงกัน" };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "รูปแบบ Email ไม่ถูกต้อง" };
  if (await prisma.user.findUnique({ where: { email } })) return { error: "Email นี้ถูกใช้งานแล้ว" };
  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.user.create({ data: { name, email, passwordHash, role: "USER" } });
  return { success: true };
}
