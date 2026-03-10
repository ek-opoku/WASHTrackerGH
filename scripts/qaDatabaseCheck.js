const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const districts = await prisma.computedIndex.count({ where: { level: 'district' } });
    const regions = await prisma.computedIndex.count({ where: { level: 'region' } });
    const national = await prisma.computedIndex.count({ where: { level: 'nation' } });

    console.log(`Counts -> Districts: ${districts}, Regions: ${regions}, National: ${national}`);

    const missingOrZero = await prisma.computedIndex.findMany({
        where: {
            OR: [
                { compositeScore: { equals: 0 } },
                { compositeScore: { equals: NaN } }
            ]
        }
    });

    console.log(`Failed/Zero Composite Scores: ${missingOrZero.length}`);
    if (missingOrZero.length > 0) {
        console.log(missingOrZero.map(m => m.name).join(', '));
    }
}

main().catch(console.error).finally(() => prisma.$disconnect());
