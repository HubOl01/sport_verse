-- CreateTable
CREATE TABLE "User" (
    "idUser" SERIAL NOT NULL,
    "email" TEXT,
    "username" TEXT NOT NULL,
    "idUsername" TEXT DEFAULT 'user_' || floor(random())::text,
    "url_avatar" TEXT DEFAULT 'https://sun6-20.userapi.com/impg/Pu7YGIlBWPmDkiuzAEDCvKRx4KWScdw7Bquizg/KQjrBVk8hL8.jpg?size=1024x1024&quality=96&sign=7efd05f6ab573527e8a2fbdbc47ddf93&type=album',
    "isCoach" BOOLEAN NOT NULL DEFAULT false,
    "isBan" BOOLEAN NOT NULL DEFAULT false,
    "isOffical" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("idUser")
);

-- CreateTable
CREATE TABLE "Profile" (
    "idProfile" SERIAL NOT NULL,
    "status" TEXT,
    "sport_type" TEXT,
    "about" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("idProfile")
);

-- CreateTable
CREATE TABLE "Community" (
    "idCommunity" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Community_pkey" PRIMARY KEY ("idCommunity")
);

-- CreateTable
CREATE TABLE "UserCommunity" (
    "idUserComunity" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "communityId" INTEGER NOT NULL,

    CONSTRAINT "UserCommunity_pkey" PRIMARY KEY ("idUserComunity")
);

-- CreateTable
CREATE TABLE "Post" (
    "idPost" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "communityId" INTEGER NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("idPost")
);

-- CreateTable
CREATE TABLE "Photo_for_post" (
    "idPhoto" SERIAL NOT NULL,
    "url_image" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "Photo_for_post_pkey" PRIMARY KEY ("idPhoto")
);

-- CreateTable
CREATE TABLE "Video_for_post" (
    "idVideo" SERIAL NOT NULL,
    "url_video" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "Video_for_post_pkey" PRIMARY KEY ("idVideo")
);

-- CreateTable
CREATE TABLE "File_for_post" (
    "idFile" SERIAL NOT NULL,
    "url_File" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "File_for_post_pkey" PRIMARY KEY ("idFile")
);

-- CreateTable
CREATE TABLE "Comment" (
    "idComment" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,
    "CommentText" TEXT NOT NULL,
    "CommentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("idComment")
);

-- CreateTable
CREATE TABLE "Like_for_post" (
    "idLike" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "Like_for_post_pkey" PRIMARY KEY ("idLike")
);

-- CreateTable
CREATE TABLE "View_for_post" (
    "idView" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "View_for_post_pkey" PRIMARY KEY ("idView")
);

-- CreateTable
CREATE TABLE "TrainingPlan" (
    "idTrainingPlan" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "isDraft" BOOLEAN DEFAULT true,
    "isPublic" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "PlanProgress" DOUBLE PRECISION,

    CONSTRAINT "TrainingPlan_pkey" PRIMARY KEY ("idTrainingPlan")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "idExercise" SERIAL NOT NULL,
    "trainingPlanId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("idExercise")
);

-- CreateTable
CREATE TABLE "TrainingResult" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "trainingPlanId" INTEGER NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "duration" BIGINT,
    "difficulty" INTEGER DEFAULT 5,

    CONSTRAINT "TrainingResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseResult" (
    "idExerciseResult" SERIAL NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "duration" BIGINT,
    "distance" DOUBLE PRECISION,
    "doneExercise" BOOLEAN,
    "resultsNumber" DOUBLE PRECISION,

    CONSTRAINT "ExerciseResult_pkey" PRIMARY KEY ("idExerciseResult")
);

-- CreateTable
CREATE TABLE "TrainingGroup" (
    "idTrainingGroup" SERIAL NOT NULL,
    "trainerId" INTEGER NOT NULL,
    "athleteId" INTEGER NOT NULL,

    CONSTRAINT "TrainingGroup_pkey" PRIMARY KEY ("idTrainingGroup")
);

-- CreateTable
CREATE TABLE "Complaint" (
    "idComplaint" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "resolved" BOOLEAN NOT NULL DEFAULT false,
    "kindUserId" INTEGER NOT NULL,
    "userBanId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Complaint_pkey" PRIMARY KEY ("idComplaint")
);

-- CreateTable
CREATE TABLE "Ban" (
    "idBan" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "adminId" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "period" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ban_pkey" PRIMARY KEY ("idBan")
);

-- CreateTable
CREATE TABLE "BookmarkedPost" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "BookmarkedPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookmarkedVideo" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "videoId" INTEGER NOT NULL,

    CONSTRAINT "BookmarkedVideo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookmarkedPhoto" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "photoId" INTEGER NOT NULL,

    CONSTRAINT "BookmarkedPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookmarkedFile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "fileId" INTEGER NOT NULL,

    CONSTRAINT "BookmarkedFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookmarkedTrainingPlan" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "trainingPlanId" INTEGER NOT NULL,

    CONSTRAINT "BookmarkedTrainingPlan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_idUsername_key" ON "User"("idUsername");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Community_name_key" ON "Community"("name");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCommunity" ADD CONSTRAINT "UserCommunity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCommunity" ADD CONSTRAINT "UserCommunity_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("idCommunity") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("idCommunity") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo_for_post" ADD CONSTRAINT "Photo_for_post_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("idPost") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video_for_post" ADD CONSTRAINT "Video_for_post_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("idPost") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File_for_post" ADD CONSTRAINT "File_for_post_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("idPost") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("idPost") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like_for_post" ADD CONSTRAINT "Like_for_post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like_for_post" ADD CONSTRAINT "Like_for_post_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("idPost") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "View_for_post" ADD CONSTRAINT "View_for_post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "View_for_post" ADD CONSTRAINT "View_for_post_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("idPost") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingPlan" ADD CONSTRAINT "TrainingPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_trainingPlanId_fkey" FOREIGN KEY ("trainingPlanId") REFERENCES "TrainingPlan"("idTrainingPlan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingResult" ADD CONSTRAINT "TrainingResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingResult" ADD CONSTRAINT "TrainingResult_trainingPlanId_fkey" FOREIGN KEY ("trainingPlanId") REFERENCES "TrainingPlan"("idTrainingPlan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseResult" ADD CONSTRAINT "ExerciseResult_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("idExercise") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingGroup" ADD CONSTRAINT "TrainingGroup_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingGroup" ADD CONSTRAINT "TrainingGroup_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Complaint" ADD CONSTRAINT "Complaint_kindUserId_fkey" FOREIGN KEY ("kindUserId") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Complaint" ADD CONSTRAINT "Complaint_userBanId_fkey" FOREIGN KEY ("userBanId") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ban" ADD CONSTRAINT "Ban_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ban" ADD CONSTRAINT "Ban_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookmarkedPost" ADD CONSTRAINT "BookmarkedPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookmarkedPost" ADD CONSTRAINT "BookmarkedPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("idPost") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookmarkedVideo" ADD CONSTRAINT "BookmarkedVideo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookmarkedVideo" ADD CONSTRAINT "BookmarkedVideo_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video_for_post"("idVideo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookmarkedPhoto" ADD CONSTRAINT "BookmarkedPhoto_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookmarkedPhoto" ADD CONSTRAINT "BookmarkedPhoto_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "Photo_for_post"("idPhoto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookmarkedFile" ADD CONSTRAINT "BookmarkedFile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookmarkedFile" ADD CONSTRAINT "BookmarkedFile_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File_for_post"("idFile") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookmarkedTrainingPlan" ADD CONSTRAINT "BookmarkedTrainingPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookmarkedTrainingPlan" ADD CONSTRAINT "BookmarkedTrainingPlan_trainingPlanId_fkey" FOREIGN KEY ("trainingPlanId") REFERENCES "TrainingPlan"("idTrainingPlan") ON DELETE RESTRICT ON UPDATE CASCADE;
