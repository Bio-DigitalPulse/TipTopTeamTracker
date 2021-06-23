USE employees;      
INSERT INTO department (name)
VALUES 
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');
INSERT INTO role (title, salary, department_id)
VALUES 
    ('Sales Manager', 110000, 1),
    ('Sales Person', 75000, 1),
    ('Mechanical Engineer', 120000, 2),
    ('Software Engineer', 130000, 2),
    ('Account Manager', 150000, 3),
    ('Accountant', 115000, 3),
    ('Legal Advisor Lead', 180000, 4),
    ('Lawyer', 165000, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('Aaron', 'Keller', 1, NULL),
    ('Jared', 'Parker', 2, 1),
    ('Mike', 'Lahey', 3, NULL),
    ('Lisa', 'Jeffries', 4, 3),
    ('Ryan', 'Bhorst', 5, NULL),
    ('Mary', 'Williams', 6, 5),
    ('Susan', 'Thomas', 7, NULL),
    ('Tiffany', 'Brumfield', 8, 7);