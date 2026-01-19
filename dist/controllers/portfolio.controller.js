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
exports.PortfolioController = void 0;
const ioc_config_1 = __importDefault(require("../config/ioc.config"));
const ioc_types_1 = require("../config/ioc.types");
const generate_portfolio_validator_1 = require("../validators/generate-portfolio.validator");
class PortfolioController {
    constructor(unitOfService = ioc_config_1.default.get(ioc_types_1.TYPES.IUnitOfService)) {
        this.unitOfService = unitOfService;
        this.unitOfService = unitOfService;
    }
    generateAI(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const validation = (0, generate_portfolio_validator_1.validateGeneratePortfolio)(req.body);
            if (!validation.success) {
                return res.status(400).json({ error: validation.message });
            }
            const model = req.body;
            try {
                const result = yield this.unitOfService.Portfolio.generatePortfolioWithAI(model);
                return res.json(result);
            }
            catch (err) {
                const errorMessage = typeof err === 'object' && err !== null && 'message' in err ? err.message : 'Internal server error';
                return res.status(500).json({ error: errorMessage });
            }
        });
    }
}
exports.PortfolioController = PortfolioController;
