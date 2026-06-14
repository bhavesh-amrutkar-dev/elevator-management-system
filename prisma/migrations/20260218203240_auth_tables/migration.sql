-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('EMAIL_VERIFY', 'PASSWORD_RESET');

-- CreateEnum
CREATE TYPE "Industry" AS ENUM ('Education', 'HealthCare');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('Active', 'InActive', 'Invited', 'Deactivate', 'Suspend');

-- CreateEnum
CREATE TYPE "OrganizationStatus" AS ENUM ('Active', 'InActive', 'Pending', 'Suspend', 'Archive');

-- CreateEnum
CREATE TYPE "CreditType" AS ENUM ('Credit', 'Debit');

-- CreateEnum
CREATE TYPE "SubscriptionType" AS ENUM ('Monthly', 'Annual');

-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('PENDING', 'PAID', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('CASH', 'BANK_TRANSFER', 'CHEQUE', 'CREDIT_CARD', 'DEBIT_CARD', 'UPI', 'OTHER');

-- CreateEnum
CREATE TYPE "CreditExpiry" AS ENUM ('1 Month', '3 Months', '6 Months', '12 Months', '18 Months');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateTable
CREATE TABLE "Country" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "code" VARCHAR(10) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdBy" VARCHAR(100) NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedBy" VARCHAR(100),
    "modifiedDate" TIMESTAMP(3),

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "State" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "countryId" UUID NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdBy" VARCHAR(100) NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedBy" VARCHAR(100),
    "modifiedDate" TIMESTAMP(3),

    CONSTRAINT "State_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Module" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "key" VARCHAR(100) NOT NULL,
    "description" VARCHAR(255),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "parentId" UUID,
    "createdBy" VARCHAR(100) NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedBy" VARCHAR(100),
    "modifiedDate" TIMESTAMP(3),

    CONSTRAINT "Module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" UUID NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "creditBalance" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "billingAddress" TEXT,
    "officeNumber" VARCHAR(50),
    "postalCode" VARCHAR(20),
    "autoRenewal" BOOLEAN NOT NULL DEFAULT false,
    "status" "OrganizationStatus" NOT NULL DEFAULT 'Pending',
    "createdBy" VARCHAR(100) NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedBy" VARCHAR(100),
    "modifiedDate" TIMESTAMP(3),
    "countryId" UUID,
    "stateId" UUID,
    "tierId" UUID,
    "subscriptionStartDate" TIMESTAMP(3),
    "subscriptionEndDate" TIMESTAMP(3),
    "logoUrl" VARCHAR(100),
    "industry" "Industry" NOT NULL DEFAULT 'Education',

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModuleRolePermission" (
    "id" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "roleId" UUID NOT NULL,
    "userId" UUID,
    "moduleId" UUID NOT NULL,
    "hasPermission" BOOLEAN NOT NULL DEFAULT false,
    "createdBy" VARCHAR(100) NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedBy" VARCHAR(100),
    "modifiedDate" TIMESTAMP(3),

    CONSTRAINT "ModuleRolePermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255),
    "mobileNumber" VARCHAR(20),
    "profession" VARCHAR(100),
    "qualification" VARCHAR(100),
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "profilePhotoURL" VARCHAR(255),
    "eSignURL" VARCHAR(255),
    "status" "UserStatus" NOT NULL DEFAULT 'Active',
    "invitationToken" VARCHAR(255),
    "invitationExpiresAt" TIMESTAMP(3),
    "passwordResetToken" VARCHAR(255),
    "passwordResetExpiresAt" TIMESTAMP(3),
    "createdBy" VARCHAR(100) NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedBy" VARCHAR(100),
    "modifiedDate" TIMESTAMP(3),
    "roleId" UUID,
    "organizationId" UUID,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "ip" TEXT,
    "userAgent" TEXT,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "token" TEXT NOT NULL,
    "revoked" BOOLEAN NOT NULL DEFAULT false,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "type" "TokenType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditTransaction" (
    "id" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "type" "CreditType" NOT NULL,
    "credit" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "description" VARCHAR(255) NOT NULL,
    "createdBy" VARCHAR(100) NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedBy" VARCHAR(100),
    "modifiedDate" TIMESTAMP(3),

    CONSTRAINT "CreditTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSubscription" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "subscriptionId" UUID NOT NULL,
    "subscriptionType" "SubscriptionType" NOT NULL,
    "amount" DOUBLE PRECISION,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'Active',
    "createdBy" VARCHAR(100) NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedBy" VARCHAR(100),
    "modifiedDate" TIMESTAMP(3),

    CONSTRAINT "UserSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscriptionModule" (
    "id" UUID NOT NULL,
    "subscriptionId" UUID NOT NULL,
    "moduleId" UUID NOT NULL,
    "createdBy" VARCHAR(100) NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedBy" VARCHAR(100),
    "modifiedDate" TIMESTAMP(3),

    CONSTRAINT "SubscriptionModule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" UUID NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "invoiceDate" TIMESTAMP(3) NOT NULL,
    "initialAmount" DOUBLE PRECISION NOT NULL,
    "status" "InvoiceStatus" NOT NULL DEFAULT 'PENDING',
    "paymentType" "PaymentType",
    "paymentReceivedDate" TIMESTAMP(3),
    "createdBy" VARCHAR(100) NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedBy" VARCHAR(100),
    "modifiedDate" TIMESTAMP(3),
    "organizationId" UUID NOT NULL,
    "subscriptionId" UUID,
    "creditTopUpRequestId" UUID,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditTopupRequest" (
    "id" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "credit" INTEGER NOT NULL,
    "description" VARCHAR(255),
    "requestedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approvalDate" TIMESTAMP(3),
    "creditRequestStatusId" UUID NOT NULL,
    "createdBy" VARCHAR(100) NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedBy" VARCHAR(100),
    "modifiedDate" TIMESTAMP(3),

    CONSTRAINT "CreditTopupRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditRequestStatus" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "createdBy" VARCHAR(100) NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedBy" VARCHAR(100),
    "modifiedDate" TIMESTAMP(3),

    CONSTRAINT "CreditRequestStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganizationSubscription" (
    "id" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "subscriptionId" UUID NOT NULL,
    "createdBy" VARCHAR(100) NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedBy" VARCHAR(100),
    "modifiedDate" TIMESTAMP(3),

    CONSTRAINT "OrganizationSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Country_name_key" ON "Country"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Country_code_key" ON "Country"("code");

-- CreateIndex
CREATE INDEX "Country_createdBy_idx" ON "Country"("createdBy");

-- CreateIndex
CREATE INDEX "Country_modifiedBy_idx" ON "Country"("modifiedBy");

-- CreateIndex
CREATE INDEX "State_countryId_idx" ON "State"("countryId");

-- CreateIndex
CREATE UNIQUE INDEX "Module_name_key" ON "Module"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Module_key_key" ON "Module"("key");

-- CreateIndex
CREATE INDEX "Module_createdBy_idx" ON "Module"("createdBy");

-- CreateIndex
CREATE INDEX "Module_modifiedBy_idx" ON "Module"("modifiedBy");

-- CreateIndex
CREATE INDEX "Module_parentId_idx" ON "Module"("parentId");

-- CreateIndex
CREATE INDEX "Organization_countryId_idx" ON "Organization"("countryId");

-- CreateIndex
CREATE INDEX "Organization_stateId_idx" ON "Organization"("stateId");

-- CreateIndex
CREATE INDEX "Organization_tierId_idx" ON "Organization"("tierId");

-- CreateIndex
CREATE INDEX "Organization_createdBy_idx" ON "Organization"("createdBy");

-- CreateIndex
CREATE INDEX "Organization_modifiedBy_idx" ON "Organization"("modifiedBy");

-- CreateIndex
CREATE INDEX "ModuleRolePermission_organizationId_idx" ON "ModuleRolePermission"("organizationId");

-- CreateIndex
CREATE INDEX "ModuleRolePermission_roleId_idx" ON "ModuleRolePermission"("roleId");

-- CreateIndex
CREATE INDEX "ModuleRolePermission_moduleId_idx" ON "ModuleRolePermission"("moduleId");

-- CreateIndex
CREATE INDEX "ModuleRolePermission_userId_idx" ON "ModuleRolePermission"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ModuleRolePermission_organizationId_roleId_moduleId_userId_key" ON "ModuleRolePermission"("organizationId", "roleId", "moduleId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_roleId_idx" ON "User"("roleId");

-- CreateIndex
CREATE INDEX "User_organizationId_idx" ON "User"("organizationId");

-- CreateIndex
CREATE INDEX "User_invitationToken_idx" ON "User"("invitationToken");

-- CreateIndex
CREATE INDEX "User_passwordResetToken_idx" ON "User"("passwordResetToken");

-- CreateIndex
CREATE INDEX "User_createdBy_idx" ON "User"("createdBy");

-- CreateIndex
CREATE INDEX "User_modifiedBy_idx" ON "User"("modifiedBy");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_token_key" ON "RefreshToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "SubscriptionModule_subscriptionId_moduleId_key" ON "SubscriptionModule"("subscriptionId", "moduleId");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_organizationId_invoiceNumber_key" ON "Invoice"("organizationId", "invoiceNumber");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationSubscription_organizationId_subscriptionId_key" ON "OrganizationSubscription"("organizationId", "subscriptionId");

-- AddForeignKey
ALTER TABLE "State" ADD CONSTRAINT "State_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_tierId_fkey" FOREIGN KEY ("tierId") REFERENCES "Tier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleRolePermission" ADD CONSTRAINT "ModuleRolePermission_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleRolePermission" ADD CONSTRAINT "ModuleRolePermission_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleRolePermission" ADD CONSTRAINT "ModuleRolePermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleRolePermission" ADD CONSTRAINT "ModuleRolePermission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditTransaction" ADD CONSTRAINT "CreditTransaction_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSubscription" ADD CONSTRAINT "UserSubscription_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSubscription" ADD CONSTRAINT "UserSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionModule" ADD CONSTRAINT "SubscriptionModule_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionModule" ADD CONSTRAINT "SubscriptionModule_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_creditTopUpRequestId_fkey" FOREIGN KEY ("creditTopUpRequestId") REFERENCES "CreditTopupRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditTopupRequest" ADD CONSTRAINT "CreditTopupRequest_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditTopupRequest" ADD CONSTRAINT "CreditTopupRequest_creditRequestStatusId_fkey" FOREIGN KEY ("creditRequestStatusId") REFERENCES "CreditRequestStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationSubscription" ADD CONSTRAINT "OrganizationSubscription_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationSubscription" ADD CONSTRAINT "OrganizationSubscription_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
