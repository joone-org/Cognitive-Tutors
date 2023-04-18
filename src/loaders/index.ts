
import expressLoader from './express';
import { Express } from 'express';
import mongooseLoader from './mongoose';
import log from './logger';
//We have to import at least all the events once so they can be triggered
// import './events';

export default async ({ expressApp }: { expressApp: Express }) => {
  await mongooseLoader();
  log.info('MongoDB loaded and connected!');

  expressLoader({ app: expressApp });
  log.info('Express loaded');

};

