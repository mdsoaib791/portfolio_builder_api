"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ioc_config_1 = __importDefault(require("../config/ioc.config"));
const ioc_types_1 = require("../config/ioc.types");
const asyncHandler_middleware_1 = __importDefault(require("../middlewares/asyncHandler.middleware"));
const authentication_middleware_1 = __importDefault(require("../middlewares/authentication.middleware"));
const validation_middleware_1 = __importDefault(require("../middlewares/validation.middleware"));
const login_validator_1 = __importDefault(require("../validators/login.validator"));
const user_validator_1 = __importDefault(require("../validators/user.validator"));
const multer_1 = require("../utils/multer");
/**
 * @swagger
 * tags:
 *   name: Account
 *   description: Account management
 */
const accountRouter = (0, express_1.Router)();
const accountController = ioc_config_1.default.get(ioc_types_1.TYPES.AccountController);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login to account
 *     tags: [Account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginModel'
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
accountRouter.post('/login', [(0, validation_middleware_1.default)(login_validator_1.default)], (0, asyncHandler_middleware_1.default)(accountController.login));
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserModel'
 *     responses:
 *       201:
 *         description: User registered
 *       400:
 *         description: Invalid input
 */
accountRouter.post('/register', [multer_1.upload, (0, validation_middleware_1.default)(user_validator_1.default)], (0, asyncHandler_middleware_1.default)(accountController.register));
/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh authentication token
 *     tags: [Account]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token refreshed
 *       401:
 *         description: Unauthorized
 */
accountRouter.post('/refresh-token', [authentication_middleware_1.default], (0, asyncHandler_middleware_1.default)(accountController.refreshToken));
/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout from account
 *     tags: [Account]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized
 */
accountRouter.post('/logout', [authentication_middleware_1.default], (0, asyncHandler_middleware_1.default)(accountController.logout));
exports.default = accountRouter;
