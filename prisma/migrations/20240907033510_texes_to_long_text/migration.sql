-- DropIndex
DROP INDEX `soals_question_key` ON `soals`;

-- AlterTable
ALTER TABLE `soals` MODIFY `text` LONGTEXT NOT NULL,
    MODIFY `text2` LONGTEXT NULL,
    MODIFY `text3` LONGTEXT NULL,
    MODIFY `text4` LONGTEXT NULL,
    MODIFY `text5` LONGTEXT NULL,
    MODIFY `question` LONGTEXT NOT NULL,
    MODIFY `option1` LONGTEXT NULL,
    MODIFY `option2` LONGTEXT NULL,
    MODIFY `option3` LONGTEXT NULL,
    MODIFY `option4` LONGTEXT NULL,
    MODIFY `option5` LONGTEXT NULL;
