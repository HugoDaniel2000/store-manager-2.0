/*
  Warnings:

  - Added the required column `user_id` to the `Sales_Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sales_Products" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Sales_Products" ADD CONSTRAINT "Sales_Products_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
