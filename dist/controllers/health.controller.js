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
exports.HealthController = void 0;
const ioc_config_1 = __importDefault(require("../config/ioc.config"));
const ioc_types_1 = require("../config/ioc.types");
class HealthController {
    constructor(unitOfService = ioc_config_1.default.get(ioc_types_1.TYPES.IUnitOfService)) {
        this.unitOfService = unitOfService;
        this.unitOfService = unitOfService;
    }
    /**
     * Handles a health check request.
     *
     * Responds with a JSON object indicating the service status.
     *
     * @param req - The Express request object.
     * @param res - The Express response object.
     * @returns A response with HTTP status 200 and a JSON body `{ status: 'UP' }`.
     */
    check(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.status(200).json({ status: 'UP' });
        });
    }
}
exports.HealthController = HealthController;
