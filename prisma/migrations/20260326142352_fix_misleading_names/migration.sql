/*
  Warnings:

  - You are about to drop the column `exerciseId` on the `WorkoutLogExercise` table. All the data in the column will be lost.
  - You are about to drop the column `exerciseId` on the `WorkoutLogExerciseSet` table. All the data in the column will be lost.
  - Added the required column `workoutLogExerciseId` to the `WorkoutLogExerciseSet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "WorkoutLogExercise" DROP CONSTRAINT "WorkoutLogExercise_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutLogExerciseSet" DROP CONSTRAINT "WorkoutLogExerciseSet_exerciseId_fkey";

-- AlterTable
ALTER TABLE "WorkoutLogExercise" DROP COLUMN "exerciseId",
ADD COLUMN     "originalExerciseId" TEXT;

-- AlterTable
ALTER TABLE "WorkoutLogExerciseSet" DROP COLUMN "exerciseId",
ADD COLUMN     "workoutLogExerciseId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "WorkoutLogExercise" ADD CONSTRAINT "WorkoutLogExercise_originalExerciseId_fkey" FOREIGN KEY ("originalExerciseId") REFERENCES "Exercise"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutLogExerciseSet" ADD CONSTRAINT "WorkoutLogExerciseSet_workoutLogExerciseId_fkey" FOREIGN KEY ("workoutLogExerciseId") REFERENCES "WorkoutLogExercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;
