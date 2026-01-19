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
exports.ProjectController = void 0;
const ioc_config_1 = __importDefault(require("../config/ioc.config"));
const ioc_types_1 = require("../config/ioc.types");
const custom_error_1 = __importDefault(require("../exceptions/custom-error"));
class ProjectController {
    constructor(unitOfService = ioc_config_1.default.get(ioc_types_1.TYPES.IUnitOfService)) {
        this.unitOfService = unitOfService;
        this.getProjectById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const project = yield this.unitOfService.Project.findById(id);
            if (!project) {
                return res.status(404).json({ message: 'Project not found' });
            }
            const response = {
                success: true,
                data: project,
            };
            return res.status(200).json(response);
        });
        this.getAllProjects = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const _a = req.query, { page, limit, sortBy, sortOrder } = _a, filters = __rest(_a, ["page", "limit", "sortBy", "sortOrder"]);
            const result = yield this.unitOfService.Project.findAll(filters, Number(page) || 1, Number(limit) || 10, sortBy, sortOrder);
            const response = {
                success: true,
                data: result.projects,
            };
            return res.status(200).json(Object.assign(Object.assign({}, response), { total: result.total, page: result.page, limit: result.limit, totalPages: result.totalPages }));
        });
        this.createProject = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.body.userId || '';
            if (!userId) {
                throw new custom_error_1.default('User ID is required', 400);
            }
            const data = Object.assign(Object.assign({}, req.body), { userId });
            const project = yield this.unitOfService.Project.create(data);
            if (!project) {
                return res.status(400).json({ message: 'Project creation failed' });
            }
            const response = {
                success: true,
                data: project,
            };
            return res.status(201).json(response);
        });
        this.updateProjectById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const data = req.body;
            const project = yield this.unitOfService.Project.update(id, data);
            if (!project) {
                return res.status(404).json({ message: 'Project not found' });
            }
            const response = {
                success: true,
                data: project,
            };
            return res.status(200).json(response);
        });
        this.deleteProjectById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const project = yield this.unitOfService.Project.delete(id);
            if (!project) {
                return res.status(404).json({ message: 'Project not found' });
            }
            return res.status(204).send();
        });
        this.unitOfService = unitOfService;
    }
}
exports.ProjectController = ProjectController;
