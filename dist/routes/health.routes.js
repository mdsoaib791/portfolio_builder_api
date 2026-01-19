"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ioc_config_1 = __importDefault(require("../config/ioc.config"));
const ioc_types_1 = require("../config/ioc.types");
const asyncHandler_middleware_1 = __importDefault(require("../middlewares/asyncHandler.middleware"));
/**
 * @swagger
 * tags:
 *   name: Health
 *   description: Health check endpoints
 */
const healthRouter = (0, express_1.Router)();
const healthController = ioc_config_1.default.get(ioc_types_1.TYPES.HealthController);
/**
 * @swagger
 * /health/check:
 *   get:
 *     summary: Health check
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is healthy
 */
healthRouter.get('/check', (0, asyncHandler_middleware_1.default)(healthController.check));
exports.default = healthRouter;
