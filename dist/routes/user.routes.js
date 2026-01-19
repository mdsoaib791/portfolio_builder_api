"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */
const express_1 = require("express");
const ioc_config_1 = __importDefault(require("../config/ioc.config"));
const ioc_types_1 = require("../config/ioc.types");
const asyncHandler_middleware_1 = __importDefault(require("../middlewares/asyncHandler.middleware"));
const roles_enum_1 = require("../enums/roles.enum");
const authentication_middleware_1 = __importDefault(require("../middlewares/authentication.middleware"));
const authorization_middleware_1 = __importDefault(require("../middlewares/authorization.middleware"));
const userRouter = (0, express_1.Router)();
const userController = ioc_config_1.default.get(ioc_types_1.TYPES.UserController);
/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get current user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user info
 */
userRouter.get('/me', [authentication_middleware_1.default], (0, asyncHandler_middleware_1.default)(userController.getCurrentUser));
/**
 * @swagger
 * /users/getbyemail:
 *   get:
 *     summary: Get user by email
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email address of the user
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
userRouter.get('/getbyemail', [authentication_middleware_1.default], (0, asyncHandler_middleware_1.default)(userController.getUserByEmail));
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
userRouter.get('/:id', [authentication_middleware_1.default], (0, asyncHandler_middleware_1.default)(userController.getUserById));
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user by ID
 *     tags: [Users]
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
 *             $ref: '#/components/schemas/UserDto'
 *     responses:
 *       200:
 *         description: User updated
 *       404:
 *         description: User not found
 */
userRouter.put('/:id', [authentication_middleware_1.default], (0, asyncHandler_middleware_1.default)(userController.updateUserById));
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [Users]
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
 *         description: User deleted
 *       404:
 *         description: User not found
 *       403:
 *         description: Forbidden
 */
userRouter.delete('/:id', [authentication_middleware_1.default, (0, authorization_middleware_1.default)([roles_enum_1.Roles.Administrator])], (0, asyncHandler_middleware_1.default)(userController.deleteUserById));
exports.default = userRouter;
