import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create classes
  const classA = await prisma.class.upsert({
    where: { id: "class-a" },
    update: {},
    create: { id: "class-a", name: "Sunflower Class" },
  });

  const classB = await prisma.class.upsert({
    where: { id: "class-b" },
    update: {},
    create: { id: "class-b", name: "Rainbow Class" },
  });

  // Create students for Class A
  const studentsA = [
    { name: "Arjun Sharma", age: 10 },
    { name: "Priya Patel", age: 11 },
    { name: "Ravi Kumar", age: 10 },
    { name: "Sneha Reddy", age: 12 },
    { name: "Anil Singh", age: 11 },
    { name: "Kavya Nair", age: 10 },
  ];

  for (const s of studentsA) {
    await prisma.student.create({
      data: { ...s, classId: classA.id },
    });
  }

  // Create students for Class B
  const studentsB = [
    { name: "Meena Joshi", age: 9 },
    { name: "Rahul Das", age: 10 },
    { name: "Divya Menon", age: 11 },
    { name: "Suresh Iyer", age: 9 },
  ];

  for (const s of studentsB) {
    await prisma.student.create({
      data: { ...s, classId: classB.id },
    });
  }

  console.log("✅ Seed complete!");
  console.log(`   - 2 classes created`);
  console.log(`   - ${studentsA.length + studentsB.length} students created`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
