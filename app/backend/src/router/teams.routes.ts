import { Router } from 'express';
import teamsControllers from '../controllers/TeamsController';

const teamsRouter = Router();

teamsRouter.get('/teams', (req, res) => teamsControllers.getAllController(req, res));
teamsRouter.get('/teams/:id', (req, res) => teamsControllers.getByIdController(req, res));

export default teamsRouter;
