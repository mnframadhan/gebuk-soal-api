/*
  Warnings:

  - You are about to drop the column `answer` on the `soals` table. All the data in the column will be lost.
  - You are about to drop the column `explanation_image1` on the `soals` table. All the data in the column will be lost.
  - You are about to drop the column `explanation_image2` on the `soals` table. All the data in the column will be lost.
  - You are about to drop the column `explanation_image3` on the `soals` table. All the data in the column will be lost.
  - You are about to drop the column `explanation_image4` on the `soals` table. All the data in the column will be lost.
  - You are about to drop the column `explanation_image5` on the `soals` table. All the data in the column will be lost.
  - You are about to drop the column `image1` on the `soals` table. All the data in the column will be lost.
  - You are about to drop the column `image2` on the `soals` table. All the data in the column will be lost.
  - You are about to drop the column `image3` on the `soals` table. All the data in the column will be lost.
  - You are about to drop the column `image4` on the `soals` table. All the data in the column will be lost.
  - You are about to drop the column `image5` on the `soals` table. All the data in the column will be lost.
  - You are about to drop the column `option_image1` on the `soals` table. All the data in the column will be lost.
  - You are about to drop the column `option_image2` on the `soals` table. All the data in the column will be lost.
  - You are about to drop the column `option_image3` on the `soals` table. All the data in the column will be lost.
  - You are about to drop the column `option_image4` on the `soals` table. All the data in the column will be lost.
  - You are about to drop the column `option_image5` on the `soals` table. All the data in the column will be lost.
  - You are about to drop the column `option_point1` on the `soals` table. All the data in the column will be lost.
  - You are about to drop the column `option_point2` on the `soals` table. All the data in the column will be lost.
  - You are about to drop the column `option_point3` on the `soals` table. All the data in the column will be lost.
  - You are about to drop the column `option_point4` on the `soals` table. All the data in the column will be lost.
  - You are about to drop the column `option_point5` on the `soals` table. All the data in the column will be lost.
  - You are about to drop the column `text2` on the `soals` table. All the data in the column will be lost.
  - You are about to drop the column `text3` on the `soals` table. All the data in the column will be lost.
  - You are about to drop the column `text4` on the `soals` table. All the data in the column will be lost.
  - You are about to drop the column `text5` on the `soals` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `soals` table. All the data in the column will be lost.
  - Added the required column `correct_answer` to the `soals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `soals` DROP COLUMN `answer`,
    DROP COLUMN `explanation_image1`,
    DROP COLUMN `explanation_image2`,
    DROP COLUMN `explanation_image3`,
    DROP COLUMN `explanation_image4`,
    DROP COLUMN `explanation_image5`,
    DROP COLUMN `image1`,
    DROP COLUMN `image2`,
    DROP COLUMN `image3`,
    DROP COLUMN `image4`,
    DROP COLUMN `image5`,
    DROP COLUMN `option_image1`,
    DROP COLUMN `option_image2`,
    DROP COLUMN `option_image3`,
    DROP COLUMN `option_image4`,
    DROP COLUMN `option_image5`,
    DROP COLUMN `option_point1`,
    DROP COLUMN `option_point2`,
    DROP COLUMN `option_point3`,
    DROP COLUMN `option_point4`,
    DROP COLUMN `option_point5`,
    DROP COLUMN `text2`,
    DROP COLUMN `text3`,
    DROP COLUMN `text4`,
    DROP COLUMN `text5`,
    DROP COLUMN `type`,
    ADD COLUMN `correct_answer` VARCHAR(191) NOT NULL,
    ADD COLUMN `option1_point` INTEGER NULL,
    ADD COLUMN `option2_point` INTEGER NULL,
    ADD COLUMN `option3_point` INTEGER NULL,
    ADD COLUMN `option4_point` INTEGER NULL,
    ADD COLUMN `option5_point` INTEGER NULL,
    MODIFY `label` VARCHAR(191) NULL;
