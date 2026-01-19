"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioc_config_1 = __importDefault(require("../config/ioc.config"));
const ioc_types_1 = require("../config/ioc.types");
class UnitOfService {
    constructor(user = ioc_config_1.default.get(ioc_types_1.TYPES.IUserService), project = ioc_config_1.default.get(ioc_types_1.TYPES.IProjectService), skill = ioc_config_1.default.get(ioc_types_1.TYPES.ISkillService), workExperience = ioc_config_1.default.get(ioc_types_1.TYPES.IWorkExperienceService), portfolio = ioc_config_1.default.get(ioc_types_1.TYPES.IPortfolioService)) {
        this.User = user;
        this.Project = project;
        this.Skill = skill;
        this.WorkExperience = workExperience;
        this.Portfolio = portfolio;
    }
}
exports.default = UnitOfService;
