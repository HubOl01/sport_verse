```prisma

// Модель для пользователя
model User {
  id        Int        @id @default(autoincrement())
  email     String     @unique
  password  String
  name      String
  // Связь с профилем пользователя
  profile   Profile?
  // Связь с достижениями пользователя
  achievements Achievement[]
  // Связь с тренировочными планами пользователя
  trainingPlans TrainingPlan[]
  // Связь с постами пользователя
  posts      Post[]
  // Связь с сообществами пользователя
  communities UserCommunity[]
}

// Модель для профиля пользователя
model Profile {
  id        Int       @id @default(autoincrement())
  userId    Int       @unique
  birthDate DateTime
  gender    String
  address   String
  phoneNumber String
  // Связь с пользователем
  user      User @relation(fields: [userId], references: [id])
}

// Модель для достижений
model Achievement {
  id        Int        @id @default(autoincrement())
  userId    Int
  title     String
  description String
  date      DateTime
  // Связь с пользователем
  user      User @relation(fields: [userId], references: [id])
}

// Модель для тренировочных планов
model TrainingPlan {
  id          Int       @id @default(autoincrement())
  userId      Int
  title       String
  description String
  date        DateTime
  // Связь с пользователем
  user User @relation(fields: [userId], references: [id])
  // Связь с упражнениями в плане
  exercises Exercise[]
}

// Модель для упражнений в тренировочном плане
model Exercise {
  id            Int       @id @default(autoincrement())
  trainingPlanId Int
  name          String
  // Связь с тренировочным планом
  trainingPlan TrainingPlan @relation(fields: [trainingPlanId], references: [id])
}

// Модель для сообществ
model Community {
  id    Int     @id @default(autoincrement())
  name  String
  // Связь с пользователями в сообществе
  members UserCommunity[]
  // Связь с постами в сообществе
  posts  Post[]
}

// Модель для связи пользователя с сообществом
model UserCommunity {
  id          Int       @id @default(autoincrement())
  userId      Int
  communityId Int
  // Связь с пользователем
  user User @relation(fields: [userId], references: [id])
  // Связь с сообществом
  community Community @relation(fields: [communityId], references: [id])
}

// Модель для постов
model Post {
  id          Int       @id @default(autoincrement())
  userId      Int
  communityId Int?
  content     String
  date        DateTime
  // Связь с пользователем
  user User @relation(fields: [userId], references: [id])
  // Связь с сообществом (если пост в сообществе)
  community Community? @relation(fields: [communityId], references: [id])
}

```