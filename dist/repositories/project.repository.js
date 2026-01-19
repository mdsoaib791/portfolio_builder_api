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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRepository = void 0;
const client_1 = require("../prisma/generated/client");
const prisma = new client_1.PrismaClient();
class ProjectRepository {
    findAll(filters_1) {
        return __awaiter(this, arguments, void 0, function* (filters, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc') {
            const where = {};
            if (filters) {
                if (filters.userId)
                    where.userId = filters.userId;
                if (filters.title)
                    where.title = { contains: filters.title, mode: 'insensitive' };
                if (filters.technologies)
                    where.technologies = { contains: filters.technologies, mode: 'insensitive' };
                if (filters.search) {
                    where.OR = [
                        { title: { contains: filters.search, mode: 'insensitive' } },
                        { technologies: { contains: filters.search, mode: 'insensitive' } },
                    ];
                }
            }
            const skip = (page - 1) * limit;
            const total = yield prisma.project.count({ where });
            const projectsRaw = yield prisma.project.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [sortBy]: sortOrder },
            });
            const projects = projectsRaw.map(p => (Object.assign(Object.assign({}, p), { description: p.description === null ? undefined : p.description, url: p.url === null ? undefined : p.url, technologies: p.technologies === null ? undefined : p.technologies, endDate: p.endDate === null ? undefined : p.endDate })));
            return {
                projects,
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            };
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const p = yield prisma.project.findUnique({ where: { id } });
            if (!p)
                return null;
            return Object.assign(Object.assign({}, p), { description: p.description === null ? undefined : p.description, url: p.url === null ? undefined : p.url, technologies: p.technologies === null ? undefined : p.technologies, endDate: p.endDate === null ? undefined : p.endDate });
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const p = yield prisma.project.create({ data });
            return Object.assign(Object.assign({}, p), { description: p.description === null ? undefined : p.description, url: p.url === null ? undefined : p.url, technologies: p.technologies === null ? undefined : p.technologies, endDate: p.endDate === null ? undefined : p.endDate });
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const p = yield prisma.project.update({ where: { id }, data });
            return Object.assign(Object.assign({}, p), { description: p.description === null ? undefined : p.description, url: p.url === null ? undefined : p.url, technologies: p.technologies === null ? undefined : p.technologies, endDate: p.endDate === null ? undefined : p.endDate });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const p = yield prisma.project.delete({ where: { id } });
            return Object.assign(Object.assign({}, p), { description: p.description === null ? undefined : p.description, url: p.url === null ? undefined : p.url, technologies: p.technologies === null ? undefined : p.technologies, endDate: p.endDate === null ? undefined : p.endDate });
        });
    }
}
exports.ProjectRepository = ProjectRepository;
