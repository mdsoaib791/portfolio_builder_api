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
const ioc_config_1 = __importDefault(require("../config/ioc.config"));
const ioc_types_1 = require("../config/ioc.types");
const prisma_1 = __importDefault(require("../prisma"));
class UnitOfWork {
    constructor(user = ioc_config_1.default.get(ioc_types_1.TYPES.IUserRepository), project = ioc_config_1.default.get(ioc_types_1.TYPES.IProjectRepository), skill = ioc_config_1.default.get(ioc_types_1.TYPES.ISkillRepository), portfolioRepository = ioc_config_1.default.get(ioc_types_1.TYPES.IPortfolioRepository), workExperience = ioc_config_1.default.get(ioc_types_1.TYPES.IWorkExperienceRepository)) {
        this.User = user;
        this.Project = project;
        this.Skill = skill;
        this.WorkExperience = workExperience;
        this.Portfolio = portfolioRepository;
    }
    /**
     * Executes a set of operations within a database transaction.
     *
     * @param callback - A function that receives a Prisma transaction client and performs database operations.
     * @returns A promise that resolves to the result of the transaction.
     */
    transaction(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.$transaction((transactionClient) => __awaiter(this, void 0, void 0, function* () {
                return callback(transactionClient);
            }));
        });
    }
}
exports.default = UnitOfWork;
