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
const skill_validator_1 = __importDefault(require("../validators/skill.validator"));
/**
 * @swagger
 * tags:
 *   name: Skills
 *   description: Skill management
 */
const skillRouter = (0, express_1.Router)();
const skillController = ioc_config_1.default.get(ioc_types_1.TYPES.SkillController);
/**
 * @swagger
 * /skills:
 *   get:
 *     summary: Get all skills
 *     tags: [Skills]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filter by user ID
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by skill name
 *       - in: query
 *         name: level
 *         schema:
 *           type: string
 *         description: Filter by skill level
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search in name or level
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
 *         description: List of skills
 */
skillRouter.get('/', (0, asyncHandler_middleware_1.default)(skillController.getAllSkills));
/**
 * @swagger
 * /skills/{id}:
 *   get:
 *     summary: Get skill by ID
 *     tags: [Skills]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Skill ID
 *     responses:
 *       200:
 *         description: Skill found
 *       404:
 *         description: Skill not found
 */
skillRouter.get('/:id', (0, asyncHandler_middleware_1.default)(skillController.getSkillById));
/**
 * @swagger
 * /skills/{userId}:
 *   get:
 *     summary: Get skill by User ID
 *     tags: [Skills]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: Skill userId
 *     responses:
 *       200:
 *         description: Skill found
 *       404:
 *         description: Skill not found
 */
skillRouter.get('/user/:userId', (0, asyncHandler_middleware_1.default)(skillController.getSkillByUserId));
/**
 * @swagger
 * /skills:
 *   post:
 *     summary: Create a new skill
 *     tags: [Skills]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SkillDto'
 *     responses:
 *       201:
 *         description: Skill created
 *       400:
 *         description: Invalid input
 */
skillRouter.post('/', (0, validation_middleware_1.default)(skill_validator_1.default), (0, asyncHandler_middleware_1.default)(skillController.createSkill));
/**
 * @swagger
 * /skills/{id}:
 *   put:
 *     summary: Update a skill
 *     tags: [Skills]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Skill ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SkillDto'
 *     responses:
 *       200:
 *         description: Skill updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Skill not found
 */
skillRouter.put('/:id', (0, validation_middleware_1.default)(skill_validator_1.default), (0, asyncHandler_middleware_1.default)(skillController.updateSkillById));
/**
 * @swagger
 * /skills/{id}:
 *   delete:
 *     summary: Delete a skill
 *     tags: [Skills]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Skill ID
 *     responses:
 *       204:
 *         description: Skill deleted
 *       404:
 *         description: Skill not found
 */
skillRouter.delete('/:id', authentication_middleware_1.default, (0, asyncHandler_middleware_1.default)(skillController.deleteSkillById));
exports.default = skillRouter;
