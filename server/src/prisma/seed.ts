import { PrismaClient } from '@prisma/client';
import { sportTypes } from './data/sportTypes';
import { publishStatuses } from './data/publishStatuses';
import { exerciseCategories } from './data/exerciseCategories';
import { roles } from './data/roles';
import { profileStatuses } from './data/profileStatuses';
import { exercises } from './data/exercises';
import { statusesTraining } from './data/statusesTraining';
import { sportCategories } from './data/sportCategories';

const prisma = new PrismaClient();

async function main() {
  for (const item of statusesTraining) {
    await prisma.statusTraining.upsert({
      where: { title: item.title },
      update: {},
      create: item,
    });
  }
  for (const item of sportTypes) {
    await prisma.sportType.upsert({
      where: { title: item.title },
      update: {},
      create: item,
    });
  }
  for (const item of sportCategories) {
    await prisma.sportCategory.upsert({
      where: { title: item.title },
      update: {},
      create: item,
    });
  }
  for (const item of publishStatuses) {
    await prisma.statusPublish.upsert({
      where: { title: item.title },
      update: {},
      create: item,
    });
  }
  for (const item of exerciseCategories) {
    await prisma.exerciseCategory.upsert({
      where: { title: item.title },
      update: {},
      create: item,
    });
  }
  for (const item of roles) {
    await prisma.role.upsert({
      where: { title: item.title },
      update: {},
      create: item,
    });
    for (const item of profileStatuses) {
      await prisma.statusProfile.upsert({
        where: { title: item.title },
        update: {},
        create: item,
      });
    }
    for (const item of exercises) {
      await prisma.exercise.upsert({
        where: { name: item.name },
        update: {},
        create: item,
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
