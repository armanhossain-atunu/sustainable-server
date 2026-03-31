import express from 'express';
import { AiRoutes } from './ai.route';
import { UserRoutes } from './user.route';
import { ProductRoutes } from './product.route';
import { MessageRoutes } from './message.router';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/messages',
    route: MessageRoutes,
  },
  {
    path: '/ai',
    route: AiRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
