"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.UserService = void 0;
const inversify_1 = require("inversify");
const ioc_types_1 = require("../config/ioc.types");
const generated_1 = require("../prisma/generated");
const password_utils_1 = __importDefault(require("../utils/password.utils"));
let UserService = class UserService {
    constructor(unitOfWork) {
        this.unitOfWork = unitOfWork;
    }
    /**
     * Retrieves a user by unique identifier.
     *
     * @param id - The unique identifier of the user to retrieve.
     * @returns A promise that resolves to a `UserDto` if the user is found, or `null` if not found.
     */
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.unitOfWork.User.findById(id);
            if (!user) {
                return null;
            }
            return this.convertToDto(user);
        });
    }
    /**
     * Retrieves a user by email address.
     *
     * @param email - The email address of the user to find.
     * @param includePassword - Optional. Whether to include the user's password in the returned DTO. Defaults to false.
     * @returns A promise that resolves to a UserDto if the user is found, or null otherwise.
     */
    findByEmail(email_1) {
        return __awaiter(this, arguments, void 0, function* (email, includePassword = false) {
            const user = yield this.unitOfWork.User.findByEmail(email);
            if (!user) {
                return null;
            }
            return this.convertToDto(user, includePassword);
        });
    }
    /**
     * Finds a user by phone number.
     *
     * @param phoneNumber - The phone number to search for.
     * @returns A promise that resolves to a UserDto if a user is found, or null otherwise.
     */
    findByPhoneNumber(phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.unitOfWork.User.findByPhoneNumber(phoneNumber);
            if (!user) {
                return null;
            }
            return this.convertToDto(user);
        });
    }
    /**
     * Finds a user by provider ID and authentication provider.
     *
     * @param providerId - The unique identifier assigned by the authentication provider.
     * @param provider - The authentication provider (e.g., Google, Facebook).
     * @returns A promise that resolves to a `UserDto` if a matching user is found, or `null` otherwise.
     */
    findByProviderId(providerId, provider) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.unitOfWork.User.findByProviderId(providerId, provider);
            if (!user) {
                return null;
            }
            return this.convertToDto(user);
        });
    }
    /**
     * Creates a new user with the specified data and role.
     *
     * @param data - The user data required for creation, including email, password, and personal details.
     * @param role - The role to assign to the new user.
     * @returns A promise that resolves to the created user's DTO, or null if creation fails.
     */
    create(data, role) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield password_utils_1.default.hashPassword(data.password);
            const users = this.unitOfWork.transaction((transactionClient) => __awaiter(this, void 0, void 0, function* () {
                const user = yield transactionClient.user.create({
                    data: {
                        email: data.email,
                        passwordHash: hashedPassword,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        phoneNumber: data.phoneNumber,
                        phoneCountryCode: data.phoneCountryCode,
                        profileImageUrl: data.profileImageUrl,
                        cv: data.cv,
                        isEmailVerified: false,
                        isPhoneVerified: false,
                        twoFactorEnabled: false,
                        role: role,
                        provider: generated_1.AuthProvider.CREDENTIALS,
                        isActive: true,
                    },
                });
                //other table insert/update operations can be done here within a database transaction.
                // Executes a set of operations within a database transaction.
                // For example, creating a subscription for the user
                // await transactionClient.subscription.create({
                //   data: {
                //     userId: user.id,
                //     plan: 'Free' as Plan,
                //     startDate: new Date(),
                //   },
                // });
                return this.convertToDto(user);
            }));
            return users;
        });
    }
    /**
     * Updates a user's information by unique identifier.
     *
     * @param id - The unique identifier of the user to update.
     * @param data - The data to update the user with, conforming to the UpdateUserDto.
     * @returns A promise that resolves to the updated user's DTO, or null if the user was not found.
     */
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.unitOfWork.User.update(id, Object.assign({}, data));
            if (!user) {
                return null;
            }
            return this.convertToDto(user);
        });
    }
    /**
     * Deletes a user by their unique identifier.
     *
     * @param id - The unique identifier of the user to delete.
     * @returns A promise that resolves to the deleted user's DTO if found and deleted, or null if no user was found with the given id.
     */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.unitOfWork.User.delete(id);
            return this.convertToDto(user);
        });
    }
    /**
     * Converts a User entity to a UserDto object.
     *
     * @param user - The User entity to convert.
     * @param includePassword - Optional. If true, includes the user's password hash in the DTO; otherwise, omits it. Defaults to false.
     * @returns The UserDto representation of the given User entity.
     */
    convertToDto(user, includePassword = false) {
        return {
            id: user.id,
            email: user.email,
            passwordHash: includePassword ? user.passwordHash : undefined,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            phoneCountryCode: user.phoneCountryCode,
            dateOfBirth: user.dateOfBirth,
            profileImageUrl: user.profileImageUrl,
            provider: user.provider,
            providerId: user.providerId,
            isEmailVerified: user.isEmailVerified,
            isPhoneVerified: user.isPhoneVerified,
            twoFactorEnabled: user.twoFactorEnabled,
            twoFactorSecret: user.twoFactorSecret,
            role: user.role,
            bannerDesc: user.bannerDesc,
            bannerHeading: user.bannerHeading,
            cv: user.cv,
            isActive: user.isActive,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(ioc_types_1.TYPES.IUnitOfWork)),
    __metadata("design:paramtypes", [Object])
], UserService);
exports.default = UserService;
