import { Router } from "express";
import router from './userRoute';

const route = Router();

route.use('/api',router)

export default route;