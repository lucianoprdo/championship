import { Router } from 'express';
import teamsControllers from '../controllers/TeamsController';

const teamsRouter = Router();

teamsRouter.get('/teams', teamsControllers.getAllTeamsController);

export default teamsRouter;
