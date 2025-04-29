import { Router } from 'express';
import { HomeRoutes } from '../modules/home/home.route';
import { CustomerRoutes } from '../modules/customer/customer.route';
import { BikeRoutes } from '../modules/bike/bike.route';
import { ServiceRecordRoutes } from '../modules/serviceRecord/serviceRecord.route';

const router = Router();

const apiPrefix = '/api';

const moduleRoutes = [
  {
    path: '/',
    route: HomeRoutes,
  },
  {
    path: `${apiPrefix}`,
    route: HomeRoutes,
  },
  {
    path: `${apiPrefix}/customers`,
    route: CustomerRoutes,
  },
  {
    path: `${apiPrefix}/bikes`,
    route: BikeRoutes,
  },
  {
    path: `${apiPrefix}/services`,
    route: ServiceRecordRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

moduleRoutes.forEach((moduleRoute) => {
  router.use(moduleRoute.path, moduleRoute.route);
});

export default router;
