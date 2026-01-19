"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = __importStar(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const path = __importStar(require("path"));
require("reflect-metadata");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_config_1 = __importDefault(require("./config/swagger.config"));
const asyncHandler_middleware_1 = __importDefault(require("./middlewares/asyncHandler.middleware"));
const clientid_middleware_1 = __importDefault(require("./middlewares/clientid.middleware"));
const errorHandler_middleware_1 = __importDefault(require("./middlewares/errorHandler.middleware"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.get("/", (req, res) => {
    res.send("Hello from Express on Vercel!");
});
//setup public directory
app.use(express_1.default.static(path.join(__dirname, 'public')));
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//setup cors
app.use((0, cors_1.default)({
    origin: "http://localhost:3000", // allow Next.js frontend
    credentials: true, // allow cookies/headers
}));
app.get('/', (req, res) => {
    res.send('API is running...');
});
app.use((0, asyncHandler_middleware_1.default)(clientid_middleware_1.default.verify));
//route setup
app.use('/api', index_routes_1.default);
// Exclude /api-docs and /api-docs/* from clientIdMiddleware
app.use((req, res, next) => {
    if (req.path.startsWith('/api-docs')) {
        return next();
    }
    clientid_middleware_1.default.verify(req, res, next);
});
// Swagger UI route
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_config_1.default, { customCssUrl: CSS_URL }));
// Error-handling middleware
app.use(errorHandler_middleware_1.default);
// Start server
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server is running on port http://localhost:${port}`);
    });
}
exports.default = app;
