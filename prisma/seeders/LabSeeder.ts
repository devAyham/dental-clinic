import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedLab() {

  const labs = [
    {
      id: 1,
      name: "مخبر امجد الملك ",
      email:"amgad.lab@gmail.com",
      address:"babela-albo4ea",
      phone:"0911223344"
    },
    {
      id: 2,
      name: 'مخير الشجعان ',
      email:"sami.amin@gmail.com",
      address:"rkn-alden",
      phone:"0911112222"
    },
    {
        id: 3,
        name: 'هنا للمخابر ',
        email:"hana.amin@gmail.com",
        address:"rkn-alden",
        phone:"0911447788"
      },
  ];

  for (const { id,...rest} of labs) {
    const lab = await prisma.lab.upsert({
      where: { id },
      update: {},
      create: {

       ...rest

        },
      
    });
  }
}
