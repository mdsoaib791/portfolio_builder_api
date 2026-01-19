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
exports.PortfolioRepository = void 0;
class PortfolioRepository {
    generatePortfolioWithAI(model) {
        return __awaiter(this, void 0, void 0, function* () {
            // Prepare prompt for Ollama LLM
            const prompt = `
You are an AI that generates realistic portfolio data for a web application.

Given the following context, extract and generate the following objects using the placeholders below:

{userDto}
{skillDto[]}
{projectDto[]}
{workExperienceDto[]}

Input Context: ${model.prompt}

Validate that all required fields for each object are present and plausible.
If any field is missing, unclear, or implausible, respond with a message indicating which field(s) need clarification or more detail.

Respond ONLY with either:
1. A valid JSON object containing:
{
  userDto: { ... },
  skillDto: [ ... ],
  projectDto: [ ... ],
  workExperienceDto: [ ... ],
  profileDescription: "..."
}
OR
2. A message requesting the missing or unclear information.
`;
            const response = yield fetch('http://localhost:11434/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt, model: 'llama3' })
            });
            const data = yield response.json();
            // Expect LLM to return all fields in structured format
            return {
                profileDescription: data.profileDescription,
                user: data.user,
                skills: data.skills,
                projects: data.projects,
                workExperience: data.workExperience,
            };
        });
    }
}
exports.PortfolioRepository = PortfolioRepository;
