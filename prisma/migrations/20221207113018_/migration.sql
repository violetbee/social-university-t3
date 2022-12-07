/*
  Warnings:

  - You are about to drop the column `image` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `Example` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `content` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "POST_TYPE" AS ENUM ('TEXT', 'DOC');

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "image";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "description",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "type" "POST_TYPE" NOT NULL,
ALTER COLUMN "image" DROP NOT NULL;

-- DropTable
DROP TABLE "Example";
