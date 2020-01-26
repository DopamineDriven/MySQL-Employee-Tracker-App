const inquirer = require("inquirer");
const Database = require("./db.js");
//cTable
//figlet

//connecting to database
const connection = new Database({
    host: "localhost",
    PORT: 3306,
    user: "root",
    password: "Wordpass3!!!992",
    database: "employee_track_app_db"
});

//view all employees 
async function viewAllEmployees () {
    const query = `SELECT * FROM employee`;
    const rows = await connection.query(query);
    console.table(rows)
};

//get employee names
async function acquireEmployeeRoster () {
    const query = `SELECT*FROM employee`;
    const rows = await connection.query(query);
    let names = [];
    for (const employee of rows) {
        names.push(`${employee.first_name} ${employee.last_name}`);
    }
    return names
};

//view all departments
async function obtainAllDepartments () {
    const query = `SELECT id AS 'ID', name AS 'Department' FROM department`;
    const rows = await connection.query(query);
    console.table(rows);
};

//get roles
async function obtainRoles () {
    const query = `SELECT role FROM role`;
    const rows = await connection.query(query);
    let roles = [];
    for(const row of rows) {
        roles.push(row.role)
    }
    return roles;
};


//view all roles
async function obtainAllRoles () {
    const query = `SELECT id AS 'ID', role AS 'Title', salary AS 'Salary' FROM role`;
    const rows = await connection.query(query);
    console.table(rows)
};

//get manager names
async function obtainManagerNames () {
    const query = `SELECT * FROM employee WHERE manager_id IS NULL`;
    const rows = await connection.query(query);
    let employeeNames = [];
    for(const employee of rows) {
        employeeNames.push(`${employee.first_name} ${employee.last_name}`)
    }
    return employeeNames
};

//view details for all employees
async function viewAllEmployeesDetails () {
    console.log('\n')
    const query = `SELECT employee.id AS 'ID',
        first_name AS 'First Name',
        last_name AS 'Last Name',
        role.role AS 'Title',
        department.name AS 'Department',
        role.salary AS 'Salary',
        manager_id AS 'Manager ID'
    FROM employee, role, department
    WHERE employee.role_id = role.id
    AND role.department_id = department.id
    ORDER BY employee.id ASC`;
    const rows = await connection.query(query);
    console.table(rows)
};

//view all employees by department
async function obtainEmployeesByDepartment () {
    console.log('\n')
    const query =`SELECT first_name AS 'First Name', last_name AS 'Last Name', department.name AS 'Department Name' FROM 
    ((employee INNER JOIN role ON role_id = role.id) 
    INNER JOIN department ON department_id = department.id)
    ORDER BY employee.id ASC`;
    const rows = await connection.query(query);
    console.table(rows); 
};

//get role ID
async function obtainRoleId (roleName) {
    const query = `SELECT id FROM role WHERE role.role = ?`
    const args = [roleName];
    const rows = await connection.query(query, args)
            return rows[0].id
    };

//get employee ID
async function obtainEmployeeId (employeeName) {
    if (employeeName === "None") {
        return null
    }
    const firstName = employeeName.split(' ')[0];
    const lastName = employeeName.split(' ')[1];
    const query = `SELECT id FROM employee WHERE first_name = ? AND last_name = ?`;
    const rows = await connection.query(query, [firstName, lastName], (error, results) => {
        if (error) {
            console.log(error)
            throw error
        } else {
            return rows[0].id
        }
    })
};

//retrieve employee roster
const employeeRoster = (name) => {
    let staff = name.split(' ');
    if (staff.len == 2) {
        return employee;
    }
    const lastName = staff[staff.len-1];
    let firstName = " ";
    for(let i = 0; i<staff.len; i++) {
        firstName = firstName + staff[i] + " ";
    }
    return [firstName.trim(), lastName];
}

//add an employee
async function insertEmployee (employee) {
    const roleId = await obtainRoleId(employee.role);
    const managerId = await obtainEmployeeId(employee.manager);
    const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES (?, ?, ?, ?)`;
    const args = [employee.first_name, employee.last_name, roleId, managerId];
    const rows = await connection.query(query, args, (error) => {
        if (error) {
            console.log(error)
            throw error
        } else {
            console.log(`${employee.first_name} ${employee.last_name} added.`)
            return rows 
        }
    });

};

//remove emploee 
async function slashHire(employeeName) {
    const firstName = employeeName.split(' ')[0];
    const lastName = employee.Name.split(' ')[1];
    query = `DELETE FROM employee WHERE first_name = ? AND last_name = ?`;
    connection.query(query, [firstName, lastName], (error) => {
        if (error) {
            console.log(error)
            throw error
        } else {
            console.log('Employee removed successfully.')
        }
    }) 
};


/*  SELECT first_name AS 'First Name', last_name AS 'Last Name', department.name AS 'Department Name' FROM 
        ((employee INNER JOIN role ON role_id = role.id) 
        INNER JOIN department ON department_id = department.id) */


async function uiPrompt() {
    console.log('\n')
    return inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Employees By Department",
            "View Details For All Employees",
            //"View All Employees By Manager",
            "View All Departments",
            "View All Roles",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            //"Update Employee Manager",
            "Add Department",
            //"Remove Department",
            "Add Role",
            //"Remove Role",
            //"View Total Budget",
            //"View Total Utilized Budget By Department",
            "Exit"
        ]
    }
    )
};

//add new employee info to db
async function addEmployee () {
    const managers = await obtainManagerNames();
    const roles = await obtainRoles();
    return inquirer
        .prompt([
            {
                type: "input",
                name: "first_name",
                message: "Enter first name of employee: "
            },
            {
                type: "input",
                name: "last_name",
                message: "Enter last name of employee: "
            },
            {
                type: "list",
                message: "Assign employee role: ",
                name: "role",
                choices: [
                    //populating from seeded db via spreadtax (spread syntax)
                    ...roles
                ]
            },
            {
                type: "list",
                message: "Assign manager (if applicable): ",
                name: "manager",
                choices: [
                    //populating from seeded db
                    ...managers, "null"
                ]
            }
        ])
};

async function acquireSlashHireInfo () {
    const roster = await acquireEmployeeRoster();
    return inquirer.prompt([
        {
            type: "list",
            message: "Select employee to remove: ",
            name: "employee",
            choices: [
                //populating from seeded db
                ...roster
            ]
        }
    ]);
};


//asynchronous to increase app performance && responsiveness
async function primary () {
    let terminateCircuito = false
    while(!terminateCircuito) {
        const prompt = await uiPrompt();
        switch(prompt.action.toLowerCase()) {
            //done
            case "view all employees": {
                await viewAllEmployees();
                break;
            }
            //done
            case "view all employees by department": {
                await obtainEmployeesByDepartment();
                break;
            }
            //done
            case "view details for all employees": {
                await viewAllEmployeesDetails();
                break;
            }
            //done
            case "view all departments": {
                await obtainAllDepartments();
                break;
            }
            //done
            case "view all roles": {
                await obtainAllRoles();
                break;
            }
            //done
            case "add employee": {
                const newHire = await addEmployee();
                console.log(newHire);
                await insertEmployee(newHire);
                break;
            }
            case "remove employee": {
                const eject = await acquireSlashHireInfo();
                await slashHire(eject);
                break;
            }
            case "update employee role": {
                const updateRole = await obtainUpdateEmployeeRole();
                await obtainUpdateEmployeeRole(updateRole);
                break;
            }
            case "add department": {
                const departmentAdd = await obtainDepartmentInfo();
                await addDepartment(departmentAdd);
                break;
            }
            case "add role": {
                const roleAdd = await obtainRoleInfo();
                await addRole(roleAdd);
                break;
            }
            case "exit": {
                terminateCircuito = true;
                console.log("Thank you for using employee tracker")
                process.exit(0);
            }
            default:
                break;
        }
    }
}

//terminate database connection upon exiting node CLI
process.on("exit", async (x) => {
    await connection.close();
    return console.log(`exiting with ${x}`)
});

primary();