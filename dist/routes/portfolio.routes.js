"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @swagger
 * /generate-portfolio-ai:
 *   post:
 *     summary: Generate AI-based portfolio
 *     tags: [Portfolio]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - intent
 *               - prompt
 *             properties:
 *               intent:
 *                 type: string
 *                 enum: [GENERATE_PORTFOLIO]
 *                 description: Must be 'GENERATE_PORTFOLIO'.
 *               prompt:
 *                 type: string
 *                 description: Context or instructions for portfolio generation.
 *     responses:
 *       200:
 *         description: Portfolio generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 profileDescription:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/UserDto'
 *                 skills:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/SkillDto'
 *                 projects:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ProjectDto'
 *                 workExperience:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/WorkExperienceDto'
 *       400:
 *         description: Bad request (validation error)
 *       500:
 *         description: Internal server error
 */
const express_1 = require("express");
const ioc_config_1 = __importDefault(require("../config/ioc.config"));
const ioc_types_1 = require("../config/ioc.types");
const asyncHandler_middleware_1 = __importDefault(require("../middlewares/asyncHandler.middleware"));
const generatePortfolioRouter = (0, express_1.Router)();
const portfolioController = ioc_config_1.default.get(ioc_types_1.TYPES.PortfolioController);
generatePortfolioRouter.post('/', (0, asyncHandler_middleware_1.default)(portfolioController.generateAI));
exports.default = generatePortfolioRouter;
