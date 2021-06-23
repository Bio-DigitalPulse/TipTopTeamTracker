const { //Declarations defining the stated variables
    prompt
} = require("inquirer");

const logo = require("asciiart-logo");
const db = require("./db");
require("console.table");

init();

function init() { //Function to display logo/load menu
    const menuText = logo({
        name: "TipTop Team Tracker"
    }).render();

    console.log(menuText);

    loadMenuSelect();
}

async function loadMenuSelect() { //Function displaying options for user selection
    const {
        choices
    } = await prompt([{ //Each option linked to database schema
        type: "list",
        name: "choices",
        message: "Please make a selection.",
        choices: [{
                name: "Add Employee", //ADD/REMOVE
                value: "ADD_EMPLOYEE",
            },
            {
                name: "Remove Employee",
                value: "REMOVE_EMPLOYEE",
            },
            {
                name: "Add Role",
                value: "ADD_ROLE",
            },
            {
                name: "Remove Role",
                value: "REMOVE_ROLE",
            },
            {
                name: "Add Department",
                value: "ADD_DEPARTMENT",
            }, {
                name: "Remove Department",
                value: "REMOVE_DEPARTMENT",
            },
            {
                name: "Update Employee Role", //UPDATE
                value: "UPDATE_EMPLOYEE_ROLE",
            }, {
                name: "Update Employee Manager",
                value: "UPDATE_EMPLOYEE_MANAGER",
            },
            {
                name: "View All Employees", //VIEW
                value: "VIEW_EMPLOYEES",
            },
            {
                name: "View All Roles",
                value: "VIEW_ROLES",
            }, {
                name: "View All Departments",
                value: "VIEW_DEPARTMENTS",
            },
            {
                name: "View All Employees By Department",
                value: "VIEW_EMPLOYEES_BY_DEPARTMENT",
            },
            {
                name: "View All Employees By Manager",
                value: "VIEW_EMPLOYEES_BY_MANAGER",
            },
            {
                name: "Quit", //QUIT
                value: "QUIT",
            },
        ],
    }, ]);

    switch (choices) {      //Schema calls and their applicable functionality
        case "ADD_EMPLOYEE":
            return addEmployee();
        case "REMOVE_EMPLOYEE":
            return deleteEmployee();
        case "ADD_ROLE":
            return addRole();
        case "REMOVE_ROLE":
            return deleteRole();
        case "ADD_DEPARTMENT":
            return addDepartment();
        case "REMOVE_DEPARTMENT":
            return deleteDept();
        case "UPDATE_EMPLOYEE_ROLE":
            return updateEmployeeRole();
        case "UPDATE_EMPLOYEE_MANAGER":
            return updateEmployeeManager();
        case "VIEW_EMPLOYEES":
            return viewEmployees();
        case "VIEW_ROLES":
            return viewRoles();
        case "VIEW_DEPARTMENTS":
            return viewDepartments();
        case "VIEW_EMPLOYEES_BY_DEPARTMENT":
            return viewEmployeesByDepartment();
        case "VIEW_EMPLOYEES_BY_MANAGER":
            return viewEmployeesByManager();
        default:
            return quit();
    }
}

async function addEmployee() {      //Function to add a new employee to the database
    const roles = await db.findAllRoles();
    const employees = await db.findAllEmployees();

    const employee = await prompt([{
            name: "first_name",
            message: "Provide the employees first name.",
        },
        {
            name: "last_name",
            message: "Provide the employees last name.",
        },
    ]);

    const roleSelect = roles.map(({
        id,
        title
    }) => ({
        name: title,
        value: id,
    }));

    const {
        roleId
    } = await prompt({
        type: "list",
        name: "roleId",
        message: "Select the applicable role.",
        choices: roleSelect,
    });

    employee.role_id = roleId;

    const managerSelect = employees.map(({
        id,
        first_name,
        last_name
    }) => ({
        name: `${first_name} ${last_name}`,
        value: id,
    }));
    managerSelect.unshift({
        name: "None",
        value: null
    });

    const {
        managerId
    } = await prompt({
        type: "list",
        name: "managerId",
        message: "Select the applicable manager.",
        choices: managerSelect,
    });

    employee.manager_id = managerId;

    await db.generateEmployee(employee);


    loadMenuSelect();
}

async function deleteEmployee() {       //Function to remove a employee from the database.
    const employees = await db.findAllEmployees();

    const employeeSelect = employees.map(({
        id,
        first_name,
        last_name
    }) => ({
        name: `${first_name} ${last_name}`,
        value: id,
    }));

    const {
        employeeId
    } = await prompt([{
        type: "list",
        name: "employeeId",
        message: "Select the employee to remove.",
        choices: employeeSelect,
    }, ]);

    await db.deleteEmployee(employeeId);


    loadMenuSelect();
}

async function addRole() {      //Function to add a role to the database.
    const departments = await db.findAllDepartments();

    const deptSelect = departments.map(({
        id,
        name
    }) => ({
        name: name,
        value: id,
    }));

    const role = await prompt([{
            name: "title",
            message: "Provide the role title.",
        },
        {
            name: "salary",
            message: "Provide the role salary.",
        },
        {
            type: "list",
            name: "department_id",
            message: "Provide the applicable department designation.",
            choices: deptSelect,
        },
    ]);

    await db.generateRole(role);

    loadMenuSelect();
}

async function deleteRole() {       //Function to remove a role from the database.
    const roles = await db.findAllRoles();

    const roleSelect = roles.map(({
        id,
        title
    }) => ({
        name: title,
        value: id,
    }));

    const {
        roleId
    } = await prompt([{
        type: "list",
        name: "roleId",
        message: "Select the role to remove.",
        choices: roleSelect,
    }, ]);

    await db.deleteRole(roleId);

    loadMenuSelect();
}

async function addDepartment() {        //Function to add a new department to the database.
    const department = await prompt([{
        name: "name",
        message: "Provide the new department title.",
    }, ]);

    await db.generateDept(department);

    loadMenuSelect();
}

async function deleteDept() {     //Function to remove a department from the database.
    const departments = await db.findAllDepartments();

    const deptSelect = departments.map(({
        id,
        name
    }) => ({
        name: name,
        value: id,
    }));

    const {
        departmentId
    } = await prompt({
        type: "list",
        name: "departmentId",
        message: "Select the department to remove.",
        choices: deptSelect,
    });

    await db.deleteDept(departmentId);

    loadMenuSelect();
}

async function updateEmployeeRole() {       //Function to update the role of the employee in the database.
    const employees = await db.findAllEmployees();

    const employeeSelect = employees.map(({
        id,
        first_name,
        last_name
    }) => ({
        name: `${first_name} ${last_name}`,
        value: id,
    }));

    const {
        employeeId
    } = await prompt([{
        type: "list",
        name: "employeeId",
        message: "Select an employee to update.",
        choices: employeeSelect,
    }, ]);

    const roles = await db.findAllRoles();

    const roleSelect = roles.map(({
        id,
        title
    }) => ({
        name: title,
        value: id,
    }));

    const {
        roleId
    } = await prompt([{
        type: "list",
        name: "roleId",
        message: "Select the role you want to assign to the selected employee.",
        choices: roleSelect,
    }, ]);

    await db.updateEmployeeRole(employeeId, roleId);

    loadMenuSelect();
}

async function updateEmployeeManager() {        //Function to update employee to manager.
    const employees = await db.findAllEmployees();

    const employeeSelect = employees.map(({
        id,
        first_name,
        last_name
    }) => ({
        name: `${first_name} ${last_name}`,
        value: id,
    }));

    const {
        employeeId
    } = await prompt([{
        type: "list",
        name: "employeeId",
        message: "Select the employee to assign under a manager.",
        choices: employeeSelect,
    }, ]);

    const managers = await db.findAllPossibleManagers(employeeId);

    const managerSelect = managers.map(({
        id,
        first_name,
        last_name
    }) => ({
        name: `${first_name} ${last_name}`,
        value: id,
    }));

    const {
        managerId
    } = await prompt([{
        type: "list",
        name: "managerId",
        message: "Select the manager to assign to the selected employee.",
        choices: managerSelect,
    }, ]);

    await db.updateEmployeeManager(employeeId, managerId);

    loadMenuSelect();
}

async function viewEmployees() {        //Function to view all employees in database.
    const employees = await db.findAllEmployees();
    console.table(employees);

    loadMenuSelect();
}

async function viewRoles() {        //Function to view all roles in database.
    const roles = await db.findAllRoles();
    console.table(roles);

    loadMenuSelect();
}

async function viewDepartments() {      //Function to view all departments in database.
    const departments = await db.findAllDepartments();
    console.table(departments);

    loadMenuSelect();
}

async function viewEmployeesByDepartment() {        //Function to filter searches and view employees by department.
    const departments = await db.findAllDepartments();

    const deptSelect = departments.map(({
        id,
        name
    }) => ({
        name: name,
        value: id,
    }));

    const {
        departmentId
    } = await prompt([{
        type: "list",
        name: "departmentId",
        message: "Select a department to view applicable employees.",
        choices: deptSelect,
    }, ]);

    const employees = await db.findAllEmployeesByDepartment(departmentId);
    console.table(employees);

    loadMenuSelect();
}

async function viewEmployeesByManager() {       //Function to filter searches and view employees by manager.
    const managers = await db.findAllEmployees();

    const managerSelect = managers.map(({
        id,
        first_name,
        last_name
    }) => ({
        name: `${first_name} ${last_name}`,
        value: id,
    }));

    const {
        managerId
    } = await prompt([{
        type: "list",
        name: "managerId",
        message: "Select the manager to view applicable employees.",
        choices: managerSelect,
    }, ]);

    const employees = await db.findAllEmployeesByManager(managerId);

    if (employees.length === 0) {
        console.log("The selected manager has no employees.");
    } else {
        console.table(employees);
    }

    loadMenuSelect();
}

function quit() {       //Quit function
    process.exit();
}