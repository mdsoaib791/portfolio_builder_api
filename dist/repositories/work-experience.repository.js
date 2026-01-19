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
exports.WorkExperienceRepository = void 0;
const prisma_1 = __importDefault(require("../prisma"));
class WorkExperienceRepository {
    findAll(filters_1) {
        return __awaiter(this, arguments, void 0, function* (filters, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc') {
            const where = {};
            if (filters) {
                if (filters.userId)
                    where.userId = filters.userId;
                if (filters.companyName)
                    where.companyName = { contains: filters.companyName, mode: 'insensitive' };
                if (filters.position)
                    where.position = { contains: filters.position, mode: 'insensitive' };
                if (filters.location)
                    where.location = { contains: filters.location, mode: 'insensitive' };
                if (filters.startDate)
                    where.startDate = { gte: filters.startDate };
                if (filters.endDate)
                    where.endDate = { lte: filters.endDate };
                if (filters.search) {
                    where.OR = [
                        { companyName: { contains: filters.search, mode: 'insensitive' } },
                        { position: { contains: filters.search, mode: 'insensitive' } },
                        { location: { contains: filters.search, mode: 'insensitive' } },
                    ];
                }
            }
            const skip = (page - 1) * limit;
            const total = yield prisma_1.default.workExperience.count({ where });
            const workExperiences = yield prisma_1.default.workExperience.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [sortBy]: sortOrder },
            });
            return {
                workExperiences,
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            };
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.workExperience.findUnique({
                where: { id },
            });
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.workExperience.create({
                data: {
                    userId: data.userId,
                    companyName: data.companyName,
                    position: data.position,
                    startDate: new Date(data.startDate),
                    endDate: data.endDate ? new Date(data.endDate) : null,
                    description: data.description,
                    location: data.location,
                },
            });
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.workExperience.update({
                where: { id },
                data: {
                    userId: data.userId,
                    companyName: data.companyName,
                    position: data.position,
                    startDate: data.startDate ? new Date(data.startDate) : undefined,
                    endDate: data.endDate ? new Date(data.endDate) : undefined,
                    description: data.description,
                    location: data.location,
                },
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.workExperience.delete({
                where: { id },
            });
        });
    }
}
exports.WorkExperienceRepository = WorkExperienceRepository;
