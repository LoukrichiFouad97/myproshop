import cors from 'cors'
import compression from 'compression'


export const productionLoader = (app) => {
  app.use(cors())
  app.use(compression())
  
};
