# Fetching Data - Blog Hub

โปรเจกต์ Next.js สำหรับศึกษา Data Fetching, Blog, Student CRUD และ Authentication ด้วย NextAuth/Auth.js

## Features

- Blog page ดึงข้อมูลจาก API
- Blog detail / loading / error handling
- Student CRUD ด้วย Prisma + SQLite
- สมัครสมาชิกด้วย Email + Password
- Login ด้วย Email + Password
- Login ด้วย GitHub OAuth
- Role-based access: `ADMIN`, `STAFF`, `USER`
- `/admin` สำหรับ `ADMIN` เท่านั้น
- `/unauthorized` สำหรับผู้ไม่มีสิทธิ์
- Header แสดงสถานะ Login และปุ่ม Logout

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- NextAuth/Auth.js 5 beta
- Prisma 7
- SQLite
- bcryptjs
- Zod

## Installation

### 1. Install dependencies

```bash
npm install
```

> หากเคยมี `node_modules` จากเครื่องอื่น แนะนำให้ลบ `node_modules` และ `package-lock.json` แล้วรัน `npm install` ใหม่

### 2. Configure environment

สร้างไฟล์ `.env` จาก `.env.example` และกำหนดค่า:

```env
DATABASE_URL="file:./dev.db"
AUTH_SECRET="your-secret"
AUTH_GITHUB_ID=""
AUTH_GITHUB_SECRET=""
```

สร้าง `AUTH_SECRET` ด้วย:

```bash
npx auth secret
```

จากนั้นนำค่าที่ได้ใส่ใน `.env`

### 3. Generate Prisma Client

```bash
npx prisma generate
```

### 4. Run migrations

```bash
npx prisma migrate dev
```

### 5. Start development server

```bash
npm run dev
```

เปิด http://localhost:3000

## Authentication

### Sign Up

ไปที่ `/signup`

ผู้สมัครใหม่จะถูกสร้างเป็น `USER` โดยอัตโนมัติ เพื่อป้องกันการสมัครบัญชีแล้วได้สิทธิ์ ADMIN โดยตรง

### Login

ไปที่ `/login`

รองรับ:

- Email + Password
- GitHub OAuth

### GitHub OAuth

สร้าง OAuth App ใน GitHub Developer Settings แล้วกำหนด callback URL เป็น:

```text
http://localhost:3000/api/auth/callback/github
```

จากนั้นใส่ค่าใน `.env`:

```env
AUTH_GITHUB_ID="..."
AUTH_GITHUB_SECRET="..."
```

บัญชีที่ Login ผ่าน GitHub จะมี role เป็น `USER` ใน session ตามค่าเริ่มต้น

## Roles

| Role | สิทธิ์ |
|---|---|
| USER | ใช้งานทั่วไป |
| STAFF | ผู้ใช้งานระดับ Staff |
| ADMIN | เข้า `/admin` ได้ |

### กำหนดผู้ใช้เป็น ADMIN

หลังสมัครสมาชิกแล้ว สามารถเปิด Prisma Studio:

```bash
npx prisma studio
```

แล้วเปลี่ยนค่า `role` ของผู้ใช้จาก `USER` เป็น `ADMIN`

## Routes

| Route | รายละเอียด |
|---|---|
| `/` | หน้าแรก |
| `/blogs` | รายการ Blog |
| `/blogs/[id]` | รายละเอียด Blog |
| `/students` | Student Management |
| `/login` | Login |
| `/signup` | Sign Up |
| `/admin` | Admin Dashboard |
| `/unauthorized` | ไม่มีสิทธิ์เข้าถึง |
| `/api/auth/[...nextauth]` | NextAuth API |

## Common Commands

```bash
npm run dev
npm run build
npm start
npx prisma generate
npx prisma migrate dev
npx prisma studio
```

## Project Structure

```text
app/
├── admin/
├── api/auth/[...nextauth]/
├── blogs/
├── login/
├── signup/
├── students/
├── unauthorized/
├── ui/
├── auth.ts
└── lib/prisma.ts

prisma/
├── migrations/
└── schema.prisma
```
