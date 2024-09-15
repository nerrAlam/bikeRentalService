
// all the imports here
import config from './app/config';
import app from './app';
import mongoose from 'mongoose';
import { Request, Response } from 'express';


// the main function
async function main() {
	try {
		// connect the app to the mongodb data base
		await mongoose.connect(config.databaseUrl as string);


		// running the application
		app.listen(config.port, () => {
			console.log(`bike rental service app is listening on port ${config.port}`)
		  });

	} catch (error) {
		console.log(error);
	}
};


// call the main function
main();
