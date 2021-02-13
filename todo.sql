CREATE TABLE "todo"(
"id" SERIAL PRIMARY KEY, -- every table has an id
"task" VARCHAR(1024) NOT NULL,
"complete" BOOLEAN DEFAULT FALSE); -- NOT NULL says we need a value

--select entire table
SELECT * FROM "todo";

-- Insert some test values
INSERT INTO "todo"
("task")
VALUES
('Laundry');

INSERT INTO "todo"
("task")
VALUES
('Take out Trash');

INSERT INTO "todo"
("task")
VALUES
('Dishes');

INSERT INTO "todo"
("task")
VALUES
('Wash Car');