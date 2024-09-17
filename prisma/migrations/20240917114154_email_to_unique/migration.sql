/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `companies` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `companies_email_key` ON `companies`(`email`);
