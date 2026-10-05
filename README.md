# Fetching Data - Next.js Authentication & RBAC

โปรเจกต์ Web Application พัฒนาด้วย **Next.js + TypeScript** สำหรับศึกษาและทดลองใช้งานระบบ Authentication, Role-Based Access Control (RBAC), การ Fetch API และการจัดการข้อมูลด้วย Prisma

ระบบประกอบด้วย

- Authentication ด้วย Email และ Password
- Authentication ด้วย GitHub OAuth
- สมัครสมาชิก (Sign Up)
- Role-Based Access Control (RBAC)
- Admin Dashboard
- Student CRUD
- Blogs จาก External API
- Prisma ORM
- SQLite Database
- Password Hashing ด้วย bcrypt
- Form Validation ด้วย Zod

---

# Features

## Authentication

รองรับการเข้าสู่ระบบ 2 รูปแบบ

### 1. Email / Password

ผู้ใช้สามารถสมัครสมาชิกและเข้าสู่ระบบด้วย Email และ Password

Password จะไม่ถูกเก็บลง Database โดยตรง แต่จะถูก Hash ก่อนด้วย `bcryptjs`

### 2. GitHub OAuth

สามารถเข้าสู่ระบบผ่านบัญชี GitHub ได้โดยใช้ NextAuth/Auth.js และ GitHub OAuth App

---

# Role-Based Access Control

ระบบแบ่งสิทธิ์ผู้ใช้งานออกเป็น 3 Role

| Role | รายละเอียด |
|---|---|
| `ADMIN` | ผู้ดูแลระบบ |
| `STAFF` | เจ้าหน้าที่ |
| `USER` | ผู้ใช้งานทั่วไป |

ตัวอย่างหน้าที่จำกัดสิทธิ์:

```text
/admin
```

เฉพาะผู้ใช้งานที่มี Role เป็น `ADMIN` เท่านั้นที่สามารถเข้าถึงได้

หากไม่มีสิทธิ์ ระบบจะ Redirect ไปยัง

```text
/unauthorized
```

---

# ระบบ Blogs

หน้า Blogs ใช้สำหรับดึงข้อมูลบทความจาก External API

เข้าใช้งานได้ที่

```text
http://localhost:3000/blogs
```

ระบบมี

- แสดงรายการบทความ
- รูปภาพประกอบบทความ
- Blog Card
- Blog Detail
- Dynamic Route
- Loading UI
- Error Handling

ตัวอย่างหน้ารายละเอียด:

```text
/blogs/1
/blogs/2
/blogs/3
```

---

# ระบบ Students

ระบบจัดการข้อมูลนักศึกษาแบบ CRUD

เข้าใช้งานได้ที่

```text
http://localhost:3000/students
```

รองรับ

- Create - เพิ่มนักศึกษา
- Read - แสดงรายชื่อนักศึกษา
- Update - แก้ไขข้อมูล
- Delete - ลบข้อมูล

ข้อมูลจะถูกจัดเก็บใน SQLite ผ่าน Prisma ORM

---

# Admin Dashboard

Admin สามารถเข้าใช้งานได้ที่

```text
http://localhost:3000/admin
```

หน้า Admin ใช้สำหรับแสดงข้อมูลและเมนูสำหรับจัดการระบบ เช่น

- ข้อมูลผู้ใช้งาน
- จำนวนผู้ใช้งาน
- จำนวนข้อมูลนักศึกษา
- Students Management
- Blogs
- ข้อมูล Role ของผู้ใช้งาน

ผู้ใช้ที่ไม่มี Role `ADMIN` จะไม่สามารถเข้าหน้านี้ได้

---

# เทคโนโลยีที่ใช้

- Next.js
- React
- TypeScript
- Tailwind CSS
- NextAuth / Auth.js
- GitHub OAuth
- Prisma ORM
- SQLite
- bcryptjs
- Zod

---

# ความต้องการของระบบ

ก่อนติดตั้งควรมีโปรแกรมต่อไปนี้

- Node.js 18 หรือใหม่กว่า
- npm
- Git
- Visual Studio Code หรือ Code Editor อื่น
- GitHub Account สำหรับทดสอบ GitHub OAuth

ตรวจสอบ Node.js:

```bash
node -v
```

ตรวจสอบ npm:

```bash
npm -v
```

ตรวจสอบ Git:

```bash
git --version
```

---

# Installation

## 1. ดาวน์โหลดโปรเจกต์

ถ้าใช้ Git:

```bash
git clone <repository-url>
```

จากนั้นเข้าโฟลเดอร์โปรเจกต์

```bash
cd Fetching-Data-main
```

> ต้องรันคำสั่งภายในโฟลเดอร์ที่มีไฟล์ `package.json`

สามารถตรวจสอบด้วย

```bash
dir
```

ควรพบไฟล์และโฟลเดอร์ เช่น

```text
app
prisma
package.json
tsconfig.json
next.config.ts
```

---

## 2. ติดตั้ง Dependencies

รัน

```bash
npm install
```

รอจนติดตั้งเสร็จ

ไม่ควร Copy โฟลเดอร์ `node_modules` จากเครื่องอื่นมาใช้โดยตรง ควรใช้ `npm install` บนเครื่องที่จะรันโปรเจกต์

---

# Environment Variables

สร้างไฟล์

```text
.env
```

ไว้ที่ Root ของโปรเจกต์ ซึ่งเป็นตำแหน่งเดียวกับ `package.json`

ตัวอย่าง:

```env
DATABASE_URL="file:./dev.db"

AUTH_SECRET="your-auth-secret"

AUTH_GITHUB_ID="your-github-client-id"
AUTH_GITHUB_SECRET="your-github-client-secret"
```

> ห้ามนำ Client Secret หรือ AUTH_SECRET จริงขึ้น Public GitHub Repository

---

# สร้าง AUTH_SECRET

สามารถสร้าง Secret ด้วยคำสั่ง

```bash
npx auth secret
```

จากนั้นนำค่าที่ได้มาใส่ใน `.env`

```env
AUTH_SECRET="ค่าที่สร้างได้"
```

---

# GitHub OAuth Setup

เพื่อให้ปุ่ม

```text
Continue with GitHub
```

ทำงาน จะต้องสร้าง GitHub OAuth Application ก่อน

## 1. เปิด GitHub Developer Settings

เข้า GitHub

```text
Settings
→ Developer settings
→ OAuth Apps
→ New OAuth App
```

---

## 2. ตั้งค่า OAuth Application

### Application name

ตัวอย่าง:

```text
Next.js RBAC Demo
```

### Homepage URL

```text
http://localhost:3000
```

### Authorization callback / Redirect URI

```text
http://localhost:3000/api/auth/callback/github
```

ค่าที่สำคัญคือ Redirect URI ต้องตรงกับ

```text
http://localhost:3000/api/auth/callback/github
```

---

## 3. สร้าง Client Secret

หลังสร้าง OAuth App แล้ว GitHub จะแสดง

```text
Client ID
```

จากนั้นสร้าง

```text
Client Secret
```

นำทั้งสองค่าไปใส่ใน `.env`

```env
AUTH_GITHUB_ID="Client ID จาก GitHub"
AUTH_GITHUB_SECRET="Client Secret จาก GitHub"
```

---

# Database Setup

โปรเจกต์ใช้

```text
Prisma + SQLite
```

หลัง `npm install` ให้สร้าง Prisma Client

```bash
npx prisma generate
```

จากนั้นสร้างหรืออัปเดต Database

```bash
npx prisma migrate dev
```

หากระบบถามชื่อ Migration สามารถตั้ง เช่น

```text
init
```

หรือ

```text
add-auth
```

---

# Prisma Studio

สามารถดูข้อมูลใน Database ผ่าน Prisma Studio ได้

```bash
npx prisma studio
```

จากนั้น Browser จะเปิด Prisma Studio

สามารถดูตาราง เช่น

```text
User
Student
```

---

# การกำหนด ADMIN

ผู้ใช้ที่สมัครใหม่ควรได้รับ Role เริ่มต้นเป็น

```text
USER
```

หากต้องการเปลี่ยนเป็น Admin ให้เปิด

```bash
npx prisma studio
```

เลือกตาราง

```text
User
```

หาบัญชีที่ต้องการ แล้วเปลี่ยน

```text
role
```

จาก

```text
USER
```

เป็น

```text
ADMIN
```

จากนั้น Save

แนะนำให้ Logout แล้ว Login ใหม่ เพื่อให้ Session/JWT ได้ Role ล่าสุด

---

# การรันโปรเจกต์

เปิด Development Server:

```bash
npm run dev
```

เมื่อทำงานสำเร็จ เปิด Browser:

```text
http://localhost:3000
```

หากต้องการหยุด Server:

```text
Ctrl + C
```

---

# การใช้งาน

## สมัครสมาชิก

เปิด

```text
http://localhost:3000/signup
```

กรอกข้อมูล เช่น

```text
Name
Email
Password
Confirm Password
```

จากนั้นกดสมัครสมาชิก

เมื่อสำเร็จ ระบบจะ Redirect ไปหน้า Login

---

## Login ด้วย Email และ Password

เปิด

```text
http://localhost:3000/login
```

กรอก

```text
Email
Password
```

แล้วกด

```text
Login
```

ระบบจะตรวจสอบ Password กับ Password Hash ที่อยู่ใน Database

---

## Login ด้วย GitHub

เปิด

```text
http://localhost:3000/login
```

กด

```text
Continue with GitHub
```

ระบบจะทำงานประมาณ

```text
Login Page
     ↓
Continue with GitHub
     ↓
GitHub OAuth
     ↓
Login / Authorize
     ↓
/api/auth/callback/github
     ↓
กลับเข้าสู่ Application
```

หาก Browser Login GitHub อยู่แล้ว หรือเคยอนุญาต Application แล้ว GitHub อาจไม่แสดงหน้ากรอก Username/Password ใหม่ และสามารถ Redirect กลับ Application ได้ทันที

---

# Dashboard และ Role

Flow ที่แนะนำ:

```text
                Login
                  │
         ┌────────┴────────┐
         │                 │
 Email / Password        GitHub
         │                 │
         └────────┬────────┘
                  │
                  ▼
              Dashboard
                  │
             ตรวจสอบ Role
                  │
        ┌─────────┴─────────┐
        │                   │
      ADMIN            USER / STAFF
        │                   │
        ▼                   ▼
     /admin            /dashboard
```

---

# Admin

สำหรับบัญชีที่มี Role:

```text
ADMIN
```

สามารถเปิด

```text
http://localhost:3000/admin
```

ได้

หากไม่มีสิทธิ์ ระบบจะส่งไป

```text
/unauthorized
```

---

# Students

เปิด

```text
http://localhost:3000/students
```

## เพิ่มนักศึกษา

กดปุ่มเพิ่มนักศึกษาและกรอกข้อมูล เช่น

```text
Student Code
Name
Email
Major
Year
Status
```

จากนั้นกดบันทึก

---

## แก้ไขนักศึกษา

เลือกรายการที่ต้องการแล้วกด

```text
Edit
```

แก้ไขข้อมูลและบันทึก

---

## ลบนักศึกษา

เลือกรายการแล้วกด

```text
Delete
```

ควรตรวจสอบข้อมูลก่อนลบ

---

# Blogs

เปิด

```text
http://localhost:3000/blogs
```

ระบบจะ Fetch ข้อมูลบทความจาก API และแสดงเป็น Blog Card

สามารถกดบทความเพื่อเปิดรายละเอียด เช่น

```text
http://localhost:3000/blogs/1
```

---

# Project Structure

โครงสร้างหลักของโปรเจกต์มีลักษณะประมาณนี้

```text
Fetching-Data-main/
│
├── app/
│   │
│   ├── admin/
│   │   └── page.tsx
│   │
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts
│   │
│   ├── blogs/
│   │   ├── [id]/
│   │   │   └── page.tsx
│   │   ├── error.tsx
│   │   ├── loading.tsx
│   │   └── page.tsx
│   │
│   ├── login/
│   │   └── page.tsx
│   │
│   ├── signup/
│   │   └── page.tsx
│   │
│   ├── students/
│   │   ├── create/
│   │   ├── edit/
│   │   ├── actions.ts
│   │   ├── delete-button.tsx
│   │   └── page.tsx
│   │
│   ├── unauthorized/
│   │   └── page.tsx
│   │
│   ├── lib/
│   │   └── prisma.ts
│   │
│   ├── globals.css
│   └── page.tsx
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── .env
├── auth.ts
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

---

# คำสั่งที่ใช้บ่อย

## ติดตั้ง Dependencies

```bash
npm install
```

## Development Server

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Production

```bash
npm start
```

## Prisma Generate

```bash
npx prisma generate
```

## Prisma Migration

```bash
npx prisma migrate dev
```

## Prisma Studio

```bash
npx prisma studio
```

## สร้าง Auth Secret

```bash
npx auth secret
```

---

# สรุปการติดตั้งแบบรวดเร็ว

```bash
# 1. เข้าโปรเจกต์
cd Fetching-Data-main

# 2. ติดตั้ง Dependencies
npm install

# 3. สร้าง Auth Secret
npx auth secret

# 4. ตั้งค่า .env
# AUTH_SECRET
# AUTH_GITHUB_ID
# AUTH_GITHUB_SECRET

# 5. สร้าง Prisma Client
npx prisma generate

# 6. อัปเดต Database
npx prisma migrate dev

# 7. เปิดโปรเจกต์
npm run dev
```

จากนั้นเปิด

```text
http://localhost:3000
```
