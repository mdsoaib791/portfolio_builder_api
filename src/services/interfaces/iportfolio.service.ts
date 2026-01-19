import { GeneratedPortfolioResponseDTO, GeneratePortfolioModel } from '../../dtos/generate-portfolio.dto';

export interface IPortfolioService {
  generatePortfolioWithAI(model: GeneratePortfolioModel): Promise<GeneratedPortfolioResponseDTO>;
}
