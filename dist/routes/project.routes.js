"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ioc_config_1 = __importDefault(require("../config/ioc.config"));
const ioc_types_1 = require("../config/ioc.types");
const asyncHandler_middleware_1 = __importDefault(require("../middlewares/asyncHandler.middleware"));
const validation_middleware_1 = __importDefault(require("../middlewares/validation.middleware"));
const project_validator_1 = __importDefault(require("../validators/project.validator"));
/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Project management
 */
const projectRouter = (0, express_1.Router)();
const projectController = ioc_config_1.default.get(ioc_types_1.TYPES.ProjectController);
/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filter by user ID
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filter by project title
 *       - in: query
 *         name: technologies
 *         schema:
 *           type: string
 *         description: Filter by technologies
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search in title or technologies
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Items per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort by field
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order
 *     responses:
 *       200:
 *         description: List of projects
 */
projectRouter.get('/', (0, asyncHandler_middleware_1.default)(projectController.getAllProjects));
/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Get project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Project found
 *       404:
 *         description: Project not found
 */
projectRouter.get('/:id', (0, asyncHandler_middleware_1.default)(projectController.getProjectById));
/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectDto'
 *     responses:
 *       201:
 *         description: Project created
 *       400:
 *         description: Invalid input
 */
projectRouter.post('/', (0, validation_middleware_1.default)(project_validator_1.default), (0, asyncHandler_middleware_1.default)(projectController.createProject));
/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     summary: Update a project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectDto'
 *     responses:
 *       200:
 *         description: Project updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Project not found
 */
projectRouter.put('/:id', (0, validation_middleware_1.default)(project_validator_1.default), (0, asyncHandler_middleware_1.default)(projectController.updateProjectById));
/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Delete a project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     responses:
 *       204:
 *         description: Project deleted
 *       404:
 *         description: Project not found
 */
projectRouter.delete('/:id', (0, asyncHandler_middleware_1.default)(projectController.deleteProjectById));
exports.default = projectRouter;
