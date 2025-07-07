import app from './app';
import config from './app/config';

import mongoose from 'mongoose';
import { Server } from 'http';
import seedSuperAdmin from './app/SuperAdmin';
let server: Server;
async function main() {
  try {
    await mongoose.connect(config.DB_CONNECTION_URL as string);
    await seedSuperAdmin();
    server = app.listen(config.PORT, () => {
      console.log(`SERVER IS LISTENING AT THE PORT: ${config.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

process.on('uncaughtException', () => {
  console.log('uncaughtException is Detected:Server is Shutting Down...!!!');
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  console.log(
    'unhandledRejection rejection is detected...!! Server is Shutting Down',
    error,
  );
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});
