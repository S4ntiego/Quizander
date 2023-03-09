/*
  Warnings:

  - Added the required column `highScore` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lowScore` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mediumScore` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "highScore" TEXT NOT NULL,
ADD COLUMN     "lowScore" TEXT NOT NULL,
ADD COLUMN     "mediumScore" TEXT NOT NULL;
