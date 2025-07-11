import { PrismaClient} from '@prisma/client'
const prisma = new PrismaClient();
import bcryptjs from 'bcryptjs'

async function main() {
    const password = 'securePassword123';
  const hashedPassword = bcryptjs.hashSync(password); // 10 = salt rounds
  await prisma.users.create({
    data: {
      Name: 'Mohamed Ahmed',
      Email: 'yaanbo306@gmail.com',
      Phone : '633067585',
      Password : hashedPassword,
       Role:"Super_Admin" 
    },
  });

  console.log('Seed data added.');
}

main()
  .catch((e) => {
    console.error(e);
    //@ts-ignore
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
