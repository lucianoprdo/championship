import { Router } from 'express';
import teamsControllers from '../controllers/TeamsController';

const teamsRouter = Router();

teamsRouter.get('/', (req, res) => teamsControllers.getAllController(req, res));
teamsRouter.get('/:id', (req, res) =>
  teamsControllers.getByIdController(req, res),
);

export default teamsRouter;
