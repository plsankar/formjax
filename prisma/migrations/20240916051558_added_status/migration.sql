/*
  Warnings:

  - You are about to drop the column `archived` on the `Form` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "FormStatus" AS ENUM ('WORKING', 'PAUSED', 'ARCHIVED');

-- AlterTable
ALTER TABLE "Form" DROP COLUMN "archived",
ADD COLUMN     "status" "FormStatus" NOT NULL DEFAULT 'WORKING';
