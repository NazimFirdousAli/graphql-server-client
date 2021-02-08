-- CreateTable
CREATE TABLE "Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "age" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "Post.email_unique" ON "Post"("email");
