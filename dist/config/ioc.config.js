"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const ioc_types_1 = require("./ioc.types");
// Controllers
const account_controller_1 = require("../controllers/account.controller");
const health_controller_1 = require("../controllers/health.controller");
const project_controller_1 = require("../controllers/project.controller");
const skill_controller_1 = require("../controllers/skill.controller");
const user_controller_1 = require("../controllers/user.controller");
const work_experience_controller_1 = require("../controllers/work-experience.controller");
// Services - Implementations
const portfolio_service_1 = require("../services/portfolio.service");
const project_service_1 = require("../services/project.service");
const skill_service_1 = require("../services/skill.service");
const unitof_service_1 = __importDefault(require("../services/unitof.service"));
const user_service_1 = require("../services/user.service");
const work_experience_service_1 = __importDefault(require("../services/work-experience.service"));
// Repositories - Implementations
const portfolio_controller_1 = require("../controllers/portfolio.controller");
const portfolio_repository_1 = require("../repositories/portfolio.repository");
const project_repository_1 = require("../repositories/project.repository");
const skill_repository_1 = require("../repositories/skill.repository");
const unitofwork_repository_1 = __importDefault(require("../repositories/unitofwork.repository"));
const user_repository_1 = require("../repositories/user.repository");
const work_experience_repository_1 = require("../repositories/work-experience.repository");
const container = new inversify_1.Container();
//controllers
container.bind(ioc_types_1.TYPES.HealthController).to(health_controller_1.HealthController);
container.bind(ioc_types_1.TYPES.AccountController).to(account_controller_1.AccountController);
container.bind(ioc_types_1.TYPES.UserController).to(user_controller_1.UserController);
container.bind(ioc_types_1.TYPES.WorkExperienceController).to(work_experience_controller_1.WorkExperienceController);
container.bind(ioc_types_1.TYPES.ProjectController).to(project_controller_1.ProjectController);
container.bind(ioc_types_1.TYPES.SkillController).to(skill_controller_1.SkillController);
container.bind(ioc_types_1.TYPES.PortfolioController).to(portfolio_controller_1.PortfolioController);
//repositories
container.bind(ioc_types_1.TYPES.IUnitOfWork).to(unitofwork_repository_1.default);
container.bind(ioc_types_1.TYPES.IUserRepository).to(user_repository_1.UserRepository);
container.bind(ioc_types_1.TYPES.IWorkExperienceRepository).to(work_experience_repository_1.WorkExperienceRepository);
container.bind(ioc_types_1.TYPES.ISkillRepository).to(skill_repository_1.SkillRepository);
container.bind(ioc_types_1.TYPES.IProjectRepository).to(project_repository_1.ProjectRepository);
container.bind(ioc_types_1.TYPES.IPortfolioRepository).to(portfolio_repository_1.PortfolioRepository);
//services
container.bind(ioc_types_1.TYPES.IUnitOfService).to(unitof_service_1.default);
container.bind(ioc_types_1.TYPES.IUserService).to(user_service_1.UserService);
container.bind(ioc_types_1.TYPES.IWorkExperienceService).to(work_experience_service_1.default);
container.bind(ioc_types_1.TYPES.ISkillService).to(skill_service_1.SkillService);
container.bind(ioc_types_1.TYPES.IProjectService).to(project_service_1.ProjectService);
container.bind(ioc_types_1.TYPES.IPortfolioService).to(portfolio_service_1.PortfolioService);
exports.default = container;
