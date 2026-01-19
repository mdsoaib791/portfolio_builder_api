"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const ioc_config_1 = __importDefault(require("../config/ioc.config"));
const ioc_types_1 = require("../config/ioc.types");
const custom_error_1 = __importDefault(require("../exceptions/custom-error"));
class UserController {
    constructor(unitOfService = ioc_config_1.default.get(ioc_types_1.TYPES.IUnitOfService)) {
        this.unitOfService = unitOfService;
        /**
         * Retrieves the current user from the request.
         *
         * @param req - The Express request object.
         * @param res - The Express response object.
         * @returns A promise that resolves to an Express response containing a `CustomResponse<UserDto>`.
         */
        this.getCurrentUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = ((_a = req.body) === null || _a === void 0 ? void 0 : _a.currentUserId) || '';
            if (!userId) {
                throw new custom_error_1.default('User ID is required', 400);
            }
            const user = yield this.unitOfService.User.findById(userId);
            if (!user) {
                throw new custom_error_1.default('User not found', 404);
            }
            const response = {
                success: true,
                data: user,
            };
            return res.status(200).json(response);
        });
        /**
         * Retrieves a user by their unique identifier.
         *
         * @param req - Express request object containing the user ID in the route parameters.
         * @param res - Express response object used to send the response.
         * @returns A promise that resolves to an Express response containing a `CustomResponse<UserDto>`.
         *
         * @remarks
         * - Returns a 200 status code with the user data if found.
         * - Returns a 404 status code with an error message if the user is not found.
         */
        this.getUserById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            console.log("Fetching user with ID:", userId);
            if (!userId) {
                throw new custom_error_1.default('User ID is required', 400);
            }
            const user = yield this.unitOfService.User.findById(userId);
            if (!user) {
                throw new custom_error_1.default('User not found', 404);
            }
            const response = {
                success: true,
                data: user,
            };
            console.log("response", response);
            return res.status(200).json(response);
        });
        /**
         * Retrieves a user by their email address from the query parameters.
         *
         * @param req - The Express request object, expected to have an 'email' query parameter.
         * @param res - The Express response object.
         * @returns A promise that resolves to an Express response containing a CustomResponse with the UserDto data if found,
         *          or an error message if the email is missing or the user is not found.
         *
         * @remarks
         * - Responds with 400 if the email query parameter is missing.
         * - Responds with 404 if no user is found for the provided email.
         * - Responds with 200 and the user data if found.
         */
        this.getUserByEmail = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const email = req.query.email;
            if (!email) {
                throw new custom_error_1.default('Email is required', 400);
            }
            const user = yield this.unitOfService.User.findByEmail(email);
            if (!user) {
                throw new custom_error_1.default('User not found', 404);
            }
            const response = {
                success: true,
                data: user,
            };
            return res.status(200).json(response);
        });
        /**
         * Updates a user's information by their unique identifier.
         *
         * @param req - Express request object containing the user ID in `params.id` and update data in the request body.
         * @param res - Express response object used to send the response.
         * @returns A promise that resolves to an Express response containing a `CustomResponse` with the updated `UserDto` data,
         *          or a 404 status with an error message if the user is not found.
         */
        this.updateUserById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            const data = req.body;
            const user = yield this.unitOfService.User.update(userId, data);
            if (!user) {
                throw new custom_error_1.default('User not found', 404);
            }
            const response = {
                success: true,
                data: user,
            };
            return res.status(200).json(response);
        });
        /**
         * Deletes a user by their unique identifier.
         *
         * @param req - Express request object containing the user ID in the route parameters.
         * @param res - Express response object used to send the response.
         * @returns A promise that resolves to an Express response containing a `CustomResponse<UserDto>`.
         *
         * @remarks
         * - Returns a 404 status code if the user is not found.
         * - Returns a 200 status code with the deleted user data on success.
         */
        this.deleteUserById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            const user = yield this.unitOfService.User.delete(userId);
            if (!user) {
                throw new custom_error_1.default('User not found', 404);
            }
            const response = {
                success: true,
                data: user,
            };
            return res.status(200).json(response);
        });
        this.unitOfService = unitOfService;
    }
}
exports.UserController = UserController;
