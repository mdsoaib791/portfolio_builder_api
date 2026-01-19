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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchemaByBody = void 0;
const yup_1 = require("yup");
const validateSchema = (schema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield schema.validate(req.body, { abortEarly: false });
        next();
    }
    catch (error) {
        if (error instanceof yup_1.ValidationError) {
            const validationErrors = error.inner && error.inner.length ? error.inner.map((err) => err.message) : [error.message];
            const response = {
                success: false,
                errors: validationErrors,
            };
            res.status(400).json(response);
            return; // Ensure to return after sending the response
        }
        const response = {
            success: false,
            message: 'internal server error occured while validating the schema',
        };
        res.status(500).json(response);
        return; // Ensure to return after sending the response
    }
});
exports.default = validateSchema;
const validateSchemaByBody = (req, schema) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield schema.validate(req.body, { abortEarly: false }); // Allow multiple errors
        const response = {
            success: true,
        };
        return response;
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            const validationErrors = error.inner.map((err) => err.message);
            const response = {
                success: false,
                errors: validationErrors,
            };
            return response;
        }
        const response = {
            success: false,
            errors: ['internal server error occured while validating the schema'],
        };
        return response;
    }
});
exports.validateSchemaByBody = validateSchemaByBody;
