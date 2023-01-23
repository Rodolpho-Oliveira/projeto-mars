import bcrypt from "bcrypt"

import { db } from "../src/app/database.js"

// create admin user
async function main(){
  const hashedPassword = bcrypt.hashSync("admin", 10)

  await db.user.upsert({
    where: { email: "admin@gmail.com" },
    update: {},
    create: {
        name: "admin",
        email: "admin@gmail.com",
        password: hashedPassword
    }
  })
}

main().catch(e => {
  console.log(e);
  process.exit(1);
}).finally(async () => {
  await db.$disconnect();
})