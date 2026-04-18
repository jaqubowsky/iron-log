import { User } from 'src/users/interfaces/user';
import { createStrategyUserDecorator } from './strategy-user.decorator';

export const LocalUser = createStrategyUserDecorator<User>();
