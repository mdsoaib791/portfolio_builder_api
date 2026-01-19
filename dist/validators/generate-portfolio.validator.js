"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGeneratePortfolio = validateGeneratePortfolio;
function validateGeneratePortfolio(data) {
    if (!data.intent || data.intent !== 'GENERATE_PORTFOLIO') {
        return { success: false, message: 'Intent must be GENERATE_PORTFOLIO.' };
    }
    if (!data.prompt || typeof data.prompt !== 'string' || data.prompt.trim() === '') {
        return { success: false, message: 'Prompt is required.' };
    }
    return { success: true };
}
