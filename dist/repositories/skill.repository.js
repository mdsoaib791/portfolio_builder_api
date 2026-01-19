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
exports.SkillRepository = void 0;
const client_1 = require("../prisma/generated/client");
const prisma = new client_1.PrismaClient();
class SkillRepository {
    findAll(filters_1) {
        return __awaiter(this, arguments, void 0, function* (filters, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc') {
            const where = {};
            if (filters) {
                if (filters.userId)
                    where.userId = filters.userId;
                if (filters.name)
                    where.name = { contains: filters.name, mode: 'insensitive' };
                if (filters.level)
                    where.level = { contains: filters.level, mode: 'insensitive' };
                if (filters.search) {
                    where.OR = [
                        { name: { contains: filters.search, mode: 'insensitive' } },
                        { level: { contains: filters.search, mode: 'insensitive' } },
                    ];
                }
            }
            const skip = (page - 1) * limit;
            const total = yield prisma.skill.count({ where });
            const skillsRaw = yield prisma.skill.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [sortBy]: sortOrder },
            });
            const skills = skillsRaw.map(s => (Object.assign(Object.assign({}, s), { level: s.level === undefined ? null : s.level, description: s.description === undefined ? null : s.description })));
            return {
                skills,
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            };
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const s = yield prisma.skill.findUnique({ where: { id } });
            if (!s)
                return null;
            return Object.assign(Object.assign({}, s), { level: s.level === undefined ? null : s.level, description: s.description === undefined ? null : s.description });
        });
    }
    // async findByUserId(userId: string): Promise<Skill[]> {
    //   const skills = await prisma.skill.findMany({ where: { userId } });
    //   return skills.map(s => ({
    //     ...s,
    //     level: s.level ?? null,
    //     description: s.description ?? null,
    //   }));
    // }
    findByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const skills = yield prisma.skill.findMany({
                where: { userId },
                orderBy: { createdAt: "desc" }, // optional: to get latest first
            });
            return skills.map((s) => {
                var _a, _b;
                return (Object.assign(Object.assign({}, s), { level: (_a = s.level) !== null && _a !== void 0 ? _a : null, description: (_b = s.description) !== null && _b !== void 0 ? _b : null }));
            });
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, name, level, description } = data; // only allowed fields
            const s = yield prisma.skill.create({
                data: { userId, name, level, description }
            });
            return s;
        });
    }
    // async create(data: CreateSkillModel): Promise<Skill> {
    //   const s = await prisma.skill.create({ data });
    //   console.log(s)
    //   return {
    //     ...s,
    //     level: s.level === null ? undefined : s.level,
    //     description: s.description === null ? undefined : s.description,
    //   };
    // }
    // async create(data: CreateSkillModel): Promise<Skill> {
    //   // Omit id if present in data (defensive)
    //   const { id, ...dataWithoutId } = data as any;
    //   const s = await prisma.skill.create({ data: dataWithoutId });
    //   return {
    //     ...s,
    //     level: s.level === undefined ? null : s.level,
    //     description: s.description === undefined ? null : s.description,
    //   };
    // }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const s = yield prisma.skill.update({ where: { id }, data });
            return Object.assign(Object.assign({}, s), { level: s.level === undefined ? null : s.level, description: s.description === undefined ? null : s.description });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const s = yield prisma.skill.delete({ where: { id } });
            return Object.assign(Object.assign({}, s), { level: s.level === undefined ? null : s.level, description: s.description === undefined ? null : s.description });
        });
    }
}
exports.SkillRepository = SkillRepository;
