import { Router } from 'express';
import teamsControllers from '../controllers/TeamsController';

const teamsRouter = Router();

teamsRouter.get('/teams', teamsControllers.getAllController);
teamsRouter.get('/teams/:id', teamsControllers.getByIdController);

export default teamsRouter;
