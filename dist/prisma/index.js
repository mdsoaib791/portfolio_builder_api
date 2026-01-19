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
const generated_1 = require("./generated");
// Create a singleton instance of PrismaClient
const prisma = new generated_1.PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL || '',
        },
    },
    log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
    transactionOptions: {
        isolationLevel: generated_1.Prisma.TransactionIsolationLevel.Serializable,
        maxWait: 5000, // default: 2000
        timeout: 10000, // default: 5000
    },
});
// Handle potential errors when connecting to the database
prisma
    .$connect()
    .then(() => {
    console.log('Successfully connected to the database');
})
    .catch((error) => {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
});
// Add cleanup on process termination
process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
    process.exit(0);
}));
process.on('SIGTERM', () => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
    process.exit(0);
}));
exports.default = prisma;
