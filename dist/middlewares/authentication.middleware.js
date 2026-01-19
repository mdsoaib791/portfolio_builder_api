"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = __importDefault(require("../config"));
const authentication = (req, res, next) => {
    // Get the JWT from the request header.
    const token = req.headers['authorization'];
    let jwtPayload;
    // Validate the token and retrieve its data.
    try {
        // Verify the payload fields.
        jwtPayload = (0, jsonwebtoken_1.verify)(token === null || token === void 0 ? void 0 : token.split(' ')[1], config_1.default.jwt.secret, {
            complete: true,
            audience: config_1.default.jwt.audience,
            issuer: config_1.default.jwt.issuer,
            algorithms: ['HS256'],
            clockTolerance: 0,
            ignoreExpiration: false,
            ignoreNotBefore: false,
        });
        // Add the payload to the request so controllers may access it.
        req.token = jwtPayload;
        if (!req.body)
            req.body = {};
        req.body.jwtToken = token === null || token === void 0 ? void 0 : token.split(' ')[1];
        req.body.currentUserId = jwtPayload.payload.id;
        req.body.currentUserName = jwtPayload.payload.email;
        req.body.currentUserRole = jwtPayload.payload.role;
    }
    catch (error) {
        const response = {
            success: false,
            message: 'Missing or invalid token',
        };
        res.status(401).json(response);
        return;
    }
    next();
};
exports.authentication = authentication;
exports.default = exports.authentication;
