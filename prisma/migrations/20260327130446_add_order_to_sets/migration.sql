/*
  Warnings:

  - Added the required column `order` to the `WorkoutLogExerciseSet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkoutLogExerciseSet" ADD COLUMN     "order" INTEGER NOT NULL;
