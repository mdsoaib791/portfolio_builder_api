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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillService = void 0;
const inversify_1 = require("inversify");
const ioc_types_1 = require("../config/ioc.types");
let SkillService = class SkillService {
    constructor(unitOfWork) {
        this.unitOfWork = unitOfWork;
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.unitOfWork.Skill.findById(id);
        });
    }
    findByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.unitOfWork.Skill.findByUserId(userId);
        });
    }
    findAll(filters, page, limit, sortBy, sortOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.unitOfWork.Skill.findAll(filters, page, limit, sortBy, sortOrder);
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.unitOfWork.Skill.create({
                userId: data.userId,
                name: data.name,
                level: data.level || "Beginner",
                description: data.description || undefined,
            });
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.unitOfWork.Skill.update(id, data);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.unitOfWork.Skill.delete(id);
        });
    }
};
exports.SkillService = SkillService;
exports.SkillService = SkillService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(ioc_types_1.TYPES.IUnitOfWork)),
    __metadata("design:paramtypes", [Object])
], SkillService);
