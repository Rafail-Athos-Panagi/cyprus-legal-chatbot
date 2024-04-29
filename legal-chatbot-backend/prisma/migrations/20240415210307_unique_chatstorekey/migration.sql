/*
  Warnings:

  - The primary key for the `userchathistory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[chatStoreKey]` on the table `userChatHistory` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `userchathistory` DROP PRIMARY KEY;

-- CreateIndex
CREATE UNIQUE INDEX `userChatHistory_chatStoreKey_key` ON `userChatHistory`(`chatStoreKey`);
