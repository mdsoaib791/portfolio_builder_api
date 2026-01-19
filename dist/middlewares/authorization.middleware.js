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
const ioc_types_1 = require("../config/ioc.types");
const ioc_config_1 = __importDefault(require("../config/ioc.config"));
const authorization = (roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = (req.token.payload.id || '');
        const unitOfService = ioc_config_1.default.get(ioc_types_1.TYPES.IUnitOfService);
        const user = yield unitOfService.User.findById(userId);
        if (!user) {
            const response = {
                success: false,
                message: 'User not found',
            };
            return res.status(404).json(response);
        }
        // Ensure the user's role is contained in the authorized roles.
        const hasMatchingRole = roles.includes(user.role);
        if (hasMatchingRole) {
            next();
        }
        else {
            //throw new ForbiddenError('Not enough permissions');
            const response = {
                success: false,
                message: 'Not enough permissions',
            };
            res.status(403).json(response);
            return;
        }
    });
};
exports.default = authorization;
