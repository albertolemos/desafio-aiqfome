import { Request } from 'express';

import { JwtPayload } from './jwt.interface';

export interface RequestWithUser extends Request {
  user: JwtPayload;
}
