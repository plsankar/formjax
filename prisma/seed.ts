// prisma/seed.ts

import { FormStatus, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    // Create some users if not already present
    const user = await prisma.user.findFirst();

    // Create some tags if not already present
    const tags = await Promise.all([
        prisma.tag.upsert({
            where: { name: "Landing" },
            update: {},
            create: { name: "Landing" },
        }),
        prisma.tag.upsert({
            where: { name: "Career" },
            update: {},
            create: { name: "Career" },
        }),
    ]);

    // Create 50 forms
    for (let i = 1; i <= 50; i++) {
        await prisma.form.create({
            data: {
                email: `form${i}@example.com`,
                status: i % 3 === 0 ? FormStatus.ARCHIVED : i % 2 === 0 ? FormStatus.PAUSED : FormStatus.WORKING,
                userId: i % 2 === 0 ? user?.id : undefined, // Assign users cyclically
                tags: {
                    connect: [
                        { id: tags[i % tags.length].id }, // Connect tags cyclically
                    ],
                },
            },
        });
    }

    console.log("Database seeding completed.");
}

main()
    .catch((e) => {
        console.error("Error seeding database:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
