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
exports.UserRepository = void 0;
const prisma_1 = __importDefault(require("../prisma"));
class UserRepository {
    /**
     * Retrieves a user by their unique identifier.
     *
     * @param id - The unique identifier of the user to find.
     * @returns A promise that resolves to the user if found, or `null` if no user exists with the given id.
     */
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = prisma_1.default.user.findUnique({
                where: { id, isActive: true },
                select: {
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                    phoneNumber: true,
                    phoneCountryCode: true,
                    bannerHeading: true,
                    bannerDesc: true,
                    cv: true,
                    dateOfBirth: true,
                    profileImageUrl: true,
                    provider: true,
                    providerId: true,
                    isEmailVerified: true,
                    isPhoneVerified: true,
                    twoFactorEnabled: true,
                    role: true,
                    isActive: true,
                    createdAt: true,
                    updatedAt: true,
                    passwordHash: false,
                    twoFactorSecret: false,
                }
            });
            if (users) {
                return users;
            }
            return null;
        });
    }
    /**
     * Finds a user by their email address.
     *
     * @param email - The email address of the user to find.
     * @returns A promise that resolves to the user if found, or `null` if no user exists with the given email.
     */
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.user.findFirst({
                where: {
                    email: {
                        equals: email,
                        mode: 'insensitive',
                    },
                },
            });
        });
    }
    /**
     * Finds a user by their phone number.
     *
     * @param phoneNumber - The phone number to search for.
     * @returns A promise that resolves to the user if found, or `null` if no user exists with the given phone number.
     */
    findByPhoneNumber(phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.user.findFirst({
                where: {
                    phoneNumber: {
                        equals: phoneNumber,
                        mode: 'insensitive',
                    },
                },
            });
        });
    }
    /**
     * Finds a user by their provider ID and authentication provider.
     *
     * @param providerId - The unique identifier assigned by the authentication provider.
     * @param provider - The authentication provider (e.g., Google, Facebook).
     * @returns A promise that resolves to the found {@link User} object, or `null` if no user is found.
     */
    findByProviderId(providerId, provider) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.user.findFirst({
                where: {
                    providerId: {
                        equals: providerId,
                        mode: 'insensitive',
                    },
                    provider,
                },
            });
        });
    }
    /**
     * Creates a new user in the database.
     *
     * @param data - The data required to create a new user.
     * @returns A promise that resolves to the created User entity.
     */
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.user.create({
                data,
            });
        });
    }
    /**
     * Updates a user's information in the database.
     *
     * @param id - The unique identifier of the user to update.
     * @param data - An object containing the fields to update for the user.
     * @returns A promise that resolves to the updated User object.
     */
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.user.update({
                where: { id },
                data,
            });
        });
    }
    /**
     * Deletes a user from the database by unique identifier.
     *
     * @param id - The unique identifier of the user to delete.
     * @returns A promise that resolves to the deleted User object.
     */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.user.delete({
                where: { id },
            });
        });
    }
    /**
     * Retrieves a paginated list of users from the database, applying optional filters, sorting, and search criteria.
     *
     * @param filters - Optional filtering parameters to narrow down the user results. Supports filtering by email, phone number, role, active status, provider, email/phone verification status, two-factor authentication, first name, last name, and a general search across first name, last name, and email.
     * @param page - The page number for pagination (default is 1).
     * @param limit - The number of users to return per page (default is 10).
     * @param sortBy - The field by which to sort the results (default is 'createdAt').
     * @param sortOrder - The order of sorting, either 'asc' for ascending or 'desc' for descending (default is 'desc').
     * @returns An object containing the list of users, total count, current page, limit per page, and total number of pages.
     */
    findAll(filters_1) {
        return __awaiter(this, arguments, void 0, function* (filters, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc') {
            // Build where clause based on filters
            const where = {};
            if (filters) {
                // Add each filter condition if provided
                if (filters.email)
                    where.email = { contains: filters.email, mode: 'insensitive' };
                if (filters.phoneNumber)
                    where.phoneNumber = { contains: filters.phoneNumber };
                if (filters.role)
                    where.role = filters.role;
                if (filters.isActive !== undefined)
                    where.isActive = filters.isActive;
                if (filters.provider)
                    where.provider = filters.provider;
                if (filters.isEmailVerified !== undefined)
                    where.isEmailVerified = filters.isEmailVerified;
                if (filters.isPhoneVerified !== undefined)
                    where.isPhoneVerified = filters.isPhoneVerified;
                if (filters.twoFactorEnabled !== undefined)
                    where.twoFactorEnabled = filters.twoFactorEnabled;
                // Handle firstName and lastName filters
                if (filters.firstName)
                    where.firstName = { contains: filters.firstName, mode: 'insensitive' };
                if (filters.lastName)
                    where.lastName = { contains: filters.lastName, mode: 'insensitive' };
                // Handle search across multiple fields
                if (filters.search) {
                    where.OR = [
                        { firstName: { contains: filters.search, mode: 'insensitive' } },
                        { lastName: { contains: filters.search, mode: 'insensitive' } },
                        { email: { contains: filters.search, mode: 'insensitive' } },
                    ];
                }
            }
            // Calculate skip value for pagination
            const skip = (page - 1) * limit;
            // Get total count for pagination info
            const total = yield prisma_1.default.user.count({ where });
            // Get users with pagination and sorting
            const users = yield prisma_1.default.user.findMany({
                where,
                skip,
                take: limit,
                orderBy: {
                    [sortBy]: sortOrder,
                },
            });
            return {
                users,
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            };
        });
    }
    /**
     * Updates the password hash for a user with the specified ID.
     *
     * @param id - The unique identifier of the user whose password is to be updated.
     * @param passwordHash - The new hashed password to set for the user.
     * @returns A promise that resolves to the updated User object.
     */
    updatePassword(id, passwordHash) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.user.update({
                where: { id },
                data: { passwordHash },
            });
        });
    }
    /**
     * Marks the user's email as verified by updating the `isEmailVerified` field to `true`.
     *
     * @param id - The unique identifier of the user whose email is to be verified.
     * @returns A promise that resolves to the updated `User` object.
     */
    verifyEmail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.user.update({
                where: { id },
                data: { isEmailVerified: true },
            });
        });
    }
    /**
     * Marks the user's phone number as verified by updating the `isPhoneVerified` field to `true`.
     *
     * @param id - The unique identifier of the user whose phone number is to be verified.
     * @returns A promise that resolves to the updated `User` object.
     */
    verifyPhone(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.user.update({
                where: { id },
                data: { isPhoneVerified: true },
            });
        });
    }
    /**
     * Enables or disables two-factor authentication (2FA) for a user and optionally sets the 2FA secret.
     *
     * @param id - The unique identifier of the user.
     * @param enabled - A boolean indicating whether 2FA should be enabled (`true`) or disabled (`false`).
     * @param secret - (Optional) The secret key for 2FA. Required when enabling 2FA.
     * @returns A promise that resolves to the updated `User` object.
     */
    setTwoFactorEnabled(id, enabled, secret) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.user.update({
                where: { id },
                data: {
                    twoFactorEnabled: enabled,
                    twoFactorSecret: enabled ? secret : null,
                },
            });
        });
    }
    /**
     * Updates the role of a user with the specified ID.
     *
     * @param id - The unique identifier of the user whose role is to be updated.
     * @param role - The new role to assign to the user.
     * @returns A promise that resolves to the updated user object.
     */
    updateRole(id, role) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.user.update({
                where: { id },
                data: { role },
            });
        });
    }
    /**
     * Updates the active status of a user by their unique identifier.
     *
     * @param id - The unique identifier of the user.
     * @param isActive - The new active status to set for the user.
     * @returns A promise that resolves to the updated User object.
     */
    setActiveStatus(id, isActive) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.user.update({
                where: { id },
                data: { isActive },
            });
        });
    }
    /**
     * Counts the number of users grouped by their role.
     *
     * @returns A promise that resolves to an array of objects, each containing a user role and the corresponding count of users with that role.
     */
    countByRole() {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield prisma_1.default.user.groupBy({
                by: ['role'],
                _count: {
                    role: true,
                },
            });
            return results.map((result) => ({
                role: result.role,
                count: result._count.role,
            }));
        });
    }
    /**
     * Retrieves a paginated list of users whose `createdAt` date falls within the specified date range.
     *
     * @param startDate - The start date of the range (inclusive).
     * @param endDate - The end date of the range (inclusive).
     * @param page - The page number for pagination (default is 1).
     * @param limit - The number of users to return per page (default is 10).
     * @returns A promise that resolves to an object containing the array of users and the total count of users matching the criteria.
     */
    findByDateRange(startDate_1, endDate_1) {
        return __awaiter(this, arguments, void 0, function* (startDate, endDate, page = 1, limit = 10) {
            const skip = (page - 1) * limit;
            const where = {
                createdAt: {
                    gte: startDate,
                    lte: endDate,
                },
            };
            const total = yield prisma_1.default.user.count({ where });
            const users = yield prisma_1.default.user.findMany({
                where,
                skip,
                take: limit,
                orderBy: {
                    createdAt: 'desc',
                },
            });
            return { users, total };
        });
    }
}
exports.UserRepository = UserRepository;
