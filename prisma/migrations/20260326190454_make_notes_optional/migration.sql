/*
  Warnings:

  - Added the required column `order` to the `WorkoutLogExercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkoutLogExercise" ADD COLUMN     "order" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "WorkoutLogExerciseSet" ALTER COLUMN "notes" DROP NOT NULL;
