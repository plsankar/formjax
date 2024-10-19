-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "archived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tagId" TEXT;

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FormTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_FormTags_AB_unique" ON "_FormTags"("A", "B");

-- CreateIndex
CREATE INDEX "_FormTags_B_index" ON "_FormTags"("B");

-- AddForeignKey
ALTER TABLE "_FormTags" ADD CONSTRAINT "_FormTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Form"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FormTags" ADD CONSTRAINT "_FormTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
