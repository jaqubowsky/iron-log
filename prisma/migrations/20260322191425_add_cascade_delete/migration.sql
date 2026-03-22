-- DropForeignKey
ALTER TABLE "ExercisesOnWorkoutTemplate" DROP CONSTRAINT "ExercisesOnWorkoutTemplate_workoutTemplateId_fkey";

-- AddForeignKey
ALTER TABLE "ExercisesOnWorkoutTemplate" ADD CONSTRAINT "ExercisesOnWorkoutTemplate_workoutTemplateId_fkey" FOREIGN KEY ("workoutTemplateId") REFERENCES "WorkoutTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
