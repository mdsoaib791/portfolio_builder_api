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
exports.AccountController = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const ioc_config_1 = __importDefault(require("../config/ioc.config"));
const ioc_types_1 = require("../config/ioc.types");
const custom_error_1 = __importDefault(require("../exceptions/custom-error"));
const generated_1 = require("../prisma/generated");
const password_utils_1 = __importDefault(require("../utils/password.utils"));
const supabase_upload_utils_1 = require("../utils/supabase-upload.utils");
class AccountController {
    constructor(unitOfService = ioc_config_1.default.get(ioc_types_1.TYPES.IUnitOfService)) {
        this.unitOfService = unitOfService;
        /**
         * Handles user login by validating credentials and issuing a JWT token upon successful authentication.
         *
         * @param req - Express request object containing the login credentials in the request body.
         * @param res - Express response object used to send the response.
         * @returns A promise that resolves to an Express response containing a `CustomResponse` with a JWT token if authentication is successful,
         *          or an error message if authentication fails.
         *
         * @remarks
         * - The JWT token includes user information and is valid for 30 days.
         * - Returns HTTP 401 status code if the credentials are invalid.
         * - Returns HTTP 200 status code with the token if login is successful.
         */
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const model = req.body;
            let response;
            const user = yield this.unitOfService.User.findByEmail(model.email, true);
            if (!user) {
                response = {
                    success: false,
                    message: 'Invalid username or password',
                };
                return res.status(401).json(response);
            }
            const isPasswordValid = yield password_utils_1.default.comparePassword(model.password, user.passwordHash || '');
            if (!isPasswordValid) {
                response = {
                    success: false,
                    message: 'Invalid username or password',
                };
                return res.status(401).json(response);
            }
            // Generate and sign a JWT that is valid for one hour.
            const token = jwt.sign({
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                profileImageUrl: user.profileImageUrl,
                phoneNumber: user.phoneNumber,
                phoneCountryCode: user.phoneCountryCode,
                role: (_a = user.role) === null || _a === void 0 ? void 0 : _a.toString(),
            }, config_1.default.jwt.secret, {
                expiresIn: '30d',
                algorithm: 'HS256',
                audience: config_1.default.jwt.audience,
                issuer: config_1.default.jwt.issuer,
                notBefore: '0', // Cannot use before now, can be configured to be deferred.
            });
            // Remove password hash from user object before sending
            const userResponse = Object.assign({}, user);
            delete userResponse.passwordHash;
            response = {
                success: true,
                message: 'Login successful',
                data: {
                    token,
                    user: userResponse,
                },
            };
            return res.status(200).json(response);
        });
        /**
         * Registers a new user account.
         *
         * @param req - The Express request object containing user registration data in the body.
         * @param res - The Express response object used to send the response.
         * @returns A promise that resolves to an Express response containing a custom response with the created user data.
         * @throws {CustomError} If a user with the provided email already exists (409) or user creation fails (400).
         */
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const data = req.body;
            if (req.files && typeof req.files === 'object') {
                // Multer .fields() returns an object: { profileImage: [file], cv: [file] }
                const files = req.files;
                const profileImageFile = (_a = files.profileImage) === null || _a === void 0 ? void 0 : _a[0];
                const cvFile = (_b = files.cv) === null || _b === void 0 ? void 0 : _b[0];
                // Profile image upload (default image types)
                if (profileImageFile) {
                    data.profileImageUrl = yield (0, supabase_upload_utils_1.uploadToSupabaseS3)(profileImageFile.buffer, profileImageFile.originalname, profileImageFile.mimetype, 'user_profile_image', 5 * 1024 * 1024, ["image/jpeg", "image/png", "image/webp", "image/gif"]);
                }
                else {
                    data.profileImageUrl = undefined;
                }
                // CV upload (document types)
                if (cvFile) {
                    data.cv = yield (0, supabase_upload_utils_1.uploadToSupabaseS3)(cvFile.buffer, cvFile.originalname, cvFile.mimetype, 'user_cv', 5 * 1024 * 1024, [
                        "application/pdf",
                        "application/msword",
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    ]);
                }
                else {
                    data.cv = undefined;
                }
            }
            else {
                data.profileImageUrl = undefined;
                data.cv = undefined;
            }
            let response;
            const user = yield this.unitOfService.User.findByEmail(data.email, false);
            if (user) {
                throw new custom_error_1.default('User already exists', 409);
            }
            const newUser = yield this.unitOfService.User.create(data, generated_1.UserRole.USER);
            if (!newUser) {
                throw new custom_error_1.default('User creation failed', 400);
            }
            response = {
                success: true,
                message: 'User created successfully',
                data: newUser,
            };
            return res.status(201).json(response);
        });
        /**
         * Handles the refresh of a JWT token.
         *
         * Verifies the provided refresh token from the request body, and if valid,
         * generates a new JWT token with the same user payload and returns it in the response.
         *
         * @param req - Express request object containing the refresh token in the body.
         * @param res - Express response object used to send the response.
         * @returns A promise that resolves to an Express response containing a `CustomResponse` with the new JWT token as a string.
         */
        this.refreshToken = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { token } = req.body;
            let response;
            const decoded = jwt.verify(token, config_1.default.jwt.secret || '', {
                audience: config_1.default.jwt.audience,
                issuer: config_1.default.jwt.issuer,
            });
            const newToken = jwt.sign({
                id: decoded.id,
                email: decoded.email,
                firstName: decoded.firstName,
                lastName: decoded.lastName,
                profileImageUrl: decoded.profileImageUrl,
                phoneNumber: decoded.phoneNumber,
                phoneCountryCode: decoded.phoneCountryCode,
            }, config_1.default.jwt.secret || '', {
                expiresIn: '30d',
                algorithm: 'HS256',
                audience: config_1.default.jwt.audience,
                issuer: config_1.default.jwt.issuer,
                notBefore: '0',
            });
            response = {
                success: true,
                message: 'Token refreshed successfully',
                data: newToken,
            };
            return res.status(200).json(response);
        });
        /**
         * Logs out the current user by invalidating their authentication token.
         *
         * @param req - The Express request object.
         * @param res - The Express response object.
         * @returns A promise that resolves to an HTTP response containing a `CustomResponse` with a success message and null data.
         *
         * @remarks
         * The actual token invalidation logic depends on the token storage strategy (e.g., blacklisting).
         */
        this.logout = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // Invalidate the token (implementation depends on token storage strategy, e.g., blacklist)
            const response = {
                success: true,
                message: 'Logout successful',
                data: null,
            };
            return res.status(200).json(response);
        });
        this.unitOfService = unitOfService;
    }
}
exports.AccountController = AccountController;
