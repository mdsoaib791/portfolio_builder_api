"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @swagger
 * tags:
 *   name: WorkExperience
 *   description: Work Experience management
 */
const express_1 = require("express");
const ioc_config_1 = __importDefault(require("../config/ioc.config"));
const ioc_types_1 = require("../config/ioc.types");
const asyncHandler_middleware_1 = __importDefault(require("../middlewares/asyncHandler.middleware"));
const validation_middleware_1 = __importDefault(require("../middlewares/validation.middleware"));
const work_experience_validator_1 = __importDefault(require("../validators/work-experience.validator"));
const workExperienceRouter = (0, express_1.Router)();
const workExperienceController = ioc_config_1.default.get(ioc_types_1.TYPES.WorkExperienceController);
/**
 * @swagger
 * /work-experience:
 *   get:
 *     summary: Get all work experiences
 *     tags: [WorkExperience]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filter by user ID
 *       - in: query
 *         name: companyName
 *         schema:
 *           type: string
 *         description: Filter by company name
 *       - in: query
 *         name: position
 *         schema:
 *           type: string
 *         description: Filter by position
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by start date (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by end date (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: List of work experiences
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/WorkExperienceDto'
 */
/**
 * @swagger
 * /work-experience:
 *   get:
 *     summary: Get all work experiences
 *     tags: [WorkExperience]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filter by user ID
 *       - in: query
 *         name: companyName
 *         schema:
 *           type: string
 *         description: Filter by company name
 *       - in: query
 *         name: position
 *         schema:
 *           type: string
 *         description: Filter by position
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by start date (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by end date (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: List of work experiences
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/WorkExperienceDto'
 */
workExperienceRouter.get('/', (0, asyncHandler_middleware_1.default)(workExperienceController.getAllWorkExperiences));
/**
 * @swagger
 * /work-experience/{id}:
 *   get:
 *     summary: Get work experience by ID
 *     tags: [WorkExperience]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Work experience found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkExperienceDto'
 *       404:
 *         description: Work experience not found
 */
/**
 * @swagger
 * /work-experience/{id}:
 *   get:
 *     summary: Get work experience by ID
 *     tags: [WorkExperience]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Work experience found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkExperienceDto'
 *       404:
 *         description: Work experience not found
 */
workExperienceRouter.get('/:id', (0, asyncHandler_middleware_1.default)(workExperienceController.getWorkExperienceById));
/**
 * @swagger
 * /work-experience:
 *   post:
 *     summary: Create work experience
 *     tags: [WorkExperience]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateWorkExperienceModel'
 *     responses:
 *       201:
 *         description: Work experience created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkExperienceDto'
 *       400:
 *         description: Invalid input
 */
/**
 * @swagger
 * /work-experience:
 *   post:
 *     summary: Create work experience
 *     tags: [WorkExperience]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateWorkExperienceModel'
 *     responses:
 *       201:
 *         description: Work experience created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkExperienceDto'
 *       400:
 *         description: Invalid input
 */
const authentication_middleware_1 = __importDefault(require("../middlewares/authentication.middleware"));
workExperienceRouter.post('/', authentication_middleware_1.default, (0, validation_middleware_1.default)(work_experience_validator_1.default), (0, asyncHandler_middleware_1.default)(workExperienceController.createWorkExperience));
/**
 * @swagger
 * /work-experience/{id}:
 *   put:
 *     summary: Update work experience by ID
 *     tags: [WorkExperience]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateWorkExperienceModel'
 *     responses:
 *       200:
 *         description: Work experience updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkExperienceDto'
 *       404:
 *         description: Work experience not found
 */
/**
 * @swagger
 * /work-experience/{id}:
 *   put:
 *     summary: Update work experience by ID
 *     tags: [WorkExperience]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateWorkExperienceModel'
 *     responses:
 *       200:
 *         description: Work experience updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkExperienceDto'
 *       404:
 *         description: Work experience not found
 */
workExperienceRouter.put('/:id', authentication_middleware_1.default, (0, asyncHandler_middleware_1.default)(workExperienceController.updateWorkExperienceById));
/**
 * @swagger
 * /work-experience/{id}:
 *   delete:
 *     summary: Delete work experience by ID
 *     tags: [WorkExperience]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Work experience deleted
 *       404:
 *         description: Work experience not found
 */
/**
 * @swagger
 * /work-experience/{id}:
 *   delete:
 *     summary: Delete work experience by ID
 *     tags: [WorkExperience]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Work experience deleted
 *       404:
 *         description: Work experience not found
 */
workExperienceRouter.delete('/:id', authentication_middleware_1.default, (0, asyncHandler_middleware_1.default)(workExperienceController.deleteWorkExperienceById));
exports.default = workExperienceRouter;
