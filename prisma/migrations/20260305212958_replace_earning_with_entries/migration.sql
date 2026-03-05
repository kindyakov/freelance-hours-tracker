-- Drop old Earning table
DROP TABLE IF EXISTS "Earning";

-- CreateTable
CREATE TABLE "EarningEntry" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'RUB',
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EarningEntry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EarningEntry" ADD CONSTRAINT "EarningEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
