const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const TierCategories = [
  { id: "growingBusiness", name: "Growing Business" },
  { id: "startup", name: "Startup-focused" },
  { id: "enterprise", name: "Enterprise-level" },
  { id: "innovativeDisruptive", name: "Innovative/Disruptive" },
];

const ToolCategories = [
  { id: "productivity", name: "Productivity" },
  { id: "emailMarketing", name: "Email Marketing" },
  { id: "seo", name: "SEO" },
  { id: "socialMedia", name: "Social Media" },
  { id: "projectManagement", name: "Project Management" },
  { id: "officeManagement", name: "Office Management" },
  { id: "influencerManagement", name: "Influencer Management" },
  { id: "fileManagement", name: "File Management" },
  { id: "design", name: "Design" },
  { id: "customerSupport", name: "Customer Support" },
  { id: "content", name: "Content" },
  { id: "analytics", name: "Analytics" },
  { id: "adsManagement", name: "Ads Management" },
];

async function main() {
  for (const tier of TierCategories) {
    await prisma.tierCategory.upsert({
      where: { id: tier.id },
      update: {},
      create: {
        id: tier.id,
        name: tier.name,
      },
    });
  }

  for (const category of ToolCategories) {
    await prisma.toolCategory.upsert({
      where: { id: category.id },
      update: {},
      create: {
        id: category.id,
        name: category.name,
      },
    });
  }

  console.log("TierCategories and ToolCategories have been seeded.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
