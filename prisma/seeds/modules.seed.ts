import prisma from "../client";

export async function seedModules() {
    await prisma.module.createMany({
        data: [
            {
                name: "Dashboard",
                key: "DASHBOARD",
                description: "Dashboard module",
                createdBy: "SYSTEM",
            },
            {
                name: "User Management",
                key: "USER_MANAGEMENT",
                description: "Manage users",
                createdBy: "SYSTEM",
            },
            {
                name: "Role Management",
                key: "ROLE_MANAGEMENT",
                description: "Manage roles",
                createdBy: "SYSTEM",
            },
            {
                name: "Module Management",
                key: "MODULE_MANAGEMENT",
                description: "Manage modules",
                createdBy: "SYSTEM",
            },
            {
                name: "Organisation Management",
                key: "ORGANISATION_MANAGEMENT",
                description: "Manage organisations",
                createdBy: "SYSTEM",
            },
            {
                name: "Wallet Management",
                key: "WALLET_MANAGEMENT",
                description: "Manage wallets and transactions",
                createdBy: "SYSTEM",
            },
            {
                name: "Settings",
                key: "SETTINGS",
                description: "Application settings and configurations",
                createdBy: "SYSTEM",
            },
            {
                name: "Subscription Management",
                key: "SUBSCRIPTION_MANAGEMENT",
                description: "Manage subscriptions and plans",
                createdBy: "SYSTEM",
            },
            {
                name: "Client Management",
                key: "CLIENT_MANAGEMENT",
                description: "Manage clients and tenants",
                createdBy: "SYSTEM",
            },
            {
                name: "Audit Logs",
                key: "AUDIT_LOGS",
                description: "View system audit logs",
                createdBy: "SYSTEM",
            },
            {
                name: "Reports",
                key: "REPORTS",
                description: "View reports and analytics",
                createdBy: "SYSTEM",
            },
            {
                name: "Notifications",
                key: "NOTIFICATIONS",
                description: "Manage system notifications",
                createdBy: "SYSTEM",
            },
        ],
        skipDuplicates: true,
    });

    console.log("✅ Modules Seeded");
}