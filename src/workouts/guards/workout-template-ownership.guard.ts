import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JWTUserResponse } from 'src/auth/interfaces/jwt-user-response';
import { WorkoutsService } from '../workouts.service';

@Injectable()
export class WorkoutTemplateOwnershipGuard implements CanActivate {
  constructor(private workoutService: WorkoutsService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<
        Request & { user: JWTUserResponse; params: { id: string } }
      >();

    const user = request.user;
    const workoutTemplateId = request?.params?.id;

    return this.workoutService.isOwnedByUser(workoutTemplateId, user.id);
  }
}
