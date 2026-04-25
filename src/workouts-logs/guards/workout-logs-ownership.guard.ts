import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JWTUserResponse } from 'src/auth/interfaces/jwt-user-response';
import { WorkoutsLogsService } from '../workouts-logs.service';

@Injectable()
export class WorkoutLogsOwnershipGuard implements CanActivate {
  constructor(private workoutsLogsService: WorkoutsLogsService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<
        Request & { user: JWTUserResponse; params: { id: string } }
      >();

    const user = request.user;
    const workoutLogId = request?.params?.id;

    return this.workoutsLogsService.isOwnedByUser(workoutLogId, user.id);
  }
}
