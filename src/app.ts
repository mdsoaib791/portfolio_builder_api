import * as bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import * as path from 'path';
import 'reflect-metadata';
import swaggerUi from 'swagger-ui-express';
import './config';
import swaggerSpec from './config/swagger.config';
import asyncHandler from './middlewares/asyncHandler.middleware';
import { default as ClientIdMiddleware, default as clientidMiddleware } from './middlewares/clientid.middleware';
import errorHandler from './middlewares/errorHandler.middleware';
import routes from './routes/index.routes';

// Debug: show active NODE_ENV and DATABASE_URL used at startup
console.log('Active NODE_ENV=', process.env.NODE_ENV);
console.log('Resolved DATABASE_URL=', process.env.DATABASE_URL ? process.env.DATABASE_URL.split('@')[1] : process.env.DATABASE_URL);

// Environment variables are loaded via `import 'dotenv/config'` above

const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Hello from Express on Vercel!");
});

//setup public directory
app.use(express.static(path.join(__dirname, 'public')));

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//setup cors
const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL || ""
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      // Check if origin is allowed or if we are in development
      if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
        callback(null, true);
      } else {
        // Optionally allow all for now if you are unsure of the frontend URL,
        // OR return an error. For this setup, let's be permissive if configured to be.
        // For strict security, uncomment the error line and remove the fallback.
        // callback(new Error('Not allowed by CORS'));
        callback(null, true); // Fallback to allow all for smoother Vercel testing
      }
    },
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use(asyncHandler(ClientIdMiddleware.verify));

//route setup
app.use('/api', routes);

// Exclude /api-docs and /api-docs/* from clientIdMiddleware
app.use((req, res, next) => {
  if (req.path.startsWith('/api-docs')) {
    return next();
  }
  clientidMiddleware.verify(req, res, next);
});

// Swagger UI route
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCssUrl: CSS_URL,
  customJs: [
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui-bundle.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui-standalone-preset.min.js",
  ]
}));


// Error-handling middleware
app.use(errorHandler);

// Start server
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
  });
}

export default app;
