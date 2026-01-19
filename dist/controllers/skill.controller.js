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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillController = void 0;
const ioc_config_1 = __importDefault(require("../config/ioc.config"));
const ioc_types_1 = require("../config/ioc.types");
class SkillController {
    constructor(unitOfService = ioc_config_1.default.get(ioc_types_1.TYPES.IUnitOfService)) {
        this.unitOfService = unitOfService;
        this.getSkillById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const skill = yield this.unitOfService.Skill.findById(id);
            if (!skill) {
                return res.status(404).json({ message: 'Skill not found' });
            }
            const response = {
                success: true,
                data: skill,
            };
            return res.status(200).json(response);
        });
        this.getSkillByUserId = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            const skill = yield this.unitOfService.Skill.findByUserId(userId);
            if (!skill) {
                return res.status(404).json({ message: 'Skill not found' });
            }
            const response = {
                success: true,
                data: skill,
            };
            return res.status(200).json(response);
        });
        this.getAllSkills = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const _a = req.query, { page, limit, sortBy, sortOrder } = _a, filters = __rest(_a, ["page", "limit", "sortBy", "sortOrder"]);
            const result = yield this.unitOfService.Skill.findAll(filters, Number(page) || 1, Number(limit) || 10, sortBy, sortOrder);
            const response = {
                success: true,
                data: result.skills,
            };
            return res.status(200).json(Object.assign(Object.assign({}, response), { total: result.total, page: result.page, limit: result.limit, totalPages: result.totalPages }));
        });
        this.createSkill = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = ((_a = req.body) === null || _a === void 0 ? void 0 : _a.userId) || '';
            const data = Object.assign(Object.assign({}, req.body), { userId });
            const skill = yield this.unitOfService.Skill.create(data);
            if (!skill) {
                return res.status(400).json({ message: 'Skill creation failed' });
            }
            const response = {
                success: true,
                data: skill,
            };
            return res.status(201).json(response);
        });
        this.updateSkillById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const data = req.body;
            const skill = yield this.unitOfService.Skill.update(id, data);
            if (!skill) {
                return res.status(404).json({ message: 'Skill not found' });
            }
            const response = {
                success: true,
                data: skill,
            };
            return res.status(200).json(response);
        });
        this.deleteSkillById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const skill = yield this.unitOfService.Skill.delete(id);
            if (!skill) {
                return res.status(404).json({ message: 'Skill not found' });
            }
            return res.status(204).send();
        });
        this.unitOfService = unitOfService;
    }
}
exports.SkillController = SkillController;
