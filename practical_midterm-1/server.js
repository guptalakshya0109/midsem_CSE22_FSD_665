const express = require("express");
const app = express();
app.use(express.json());
let employees = [
    { id: 1, name: "Riya", department: "IT", salary: 40000 },
    { id: 2, name: "Aman", department: "HR", salary: 35000 }
];
function validEmployee(e) {
    return e &&
        Number.isInteger(e.id) && e.id > 0 &&
        typeof e.name === "string" && e.name.trim() !== "" &&
        typeof e.department === "string" && e.department.trim() !== "" &&
        typeof e.salary === "number" && Number.isFinite(e.salary) && e.salary >= 0;
}
function validId(req, res) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({ message: "Invalid employee ID" });
        return null;
    }
    return id;
}
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Employee Management API",
        endpoints: ["/employees", "/employees/:id"]
    });
});
app.get("/employees", (req, res) => {
    const department = req.query.department;
    if (department) {
        const result = employees.filter(e =>
            e.department.toLowerCase() === department.toLowerCase()
        );
        return res.status(200).json(result);
    }
    res.status(200).json(employees);
});
app.get("/employees/:id", (req, res) => {
    const id = validId(req, res);
    if (id === null) return;
    const employee = employees.find(e => e.id === id);
    if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
});
app.post("/employees", (req, res) => {
    const employee = req.body;
    if (!validEmployee(employee)) {
        return res.status(400).json({
            message: "All fields are required and must have the correct data types"
        });
    }
    if (employees.some(e => e.id === employee.id)) {
        return res.status(409).json({ message: "Employee already exists" });
    }
    const newEmployee = {
        id: employee.id,
        name: employee.name.trim(),
        department: employee.department.trim(),
        salary: employee.salary
    };
    employees.push(newEmployee);
    res.status(201).json({
        message: "Employee created successfully",
        employee: newEmployee
    });
});
app.put("/employees/:id", (req, res) => {
    const id = validId(req, res);
    if (id === null) return;
    const employee = req.body;
    if (!validEmployee(employee) || employee.id !== id) {
        return res.status(400).json({
            message: "Provide all valid fields and keep body id same as URL id"
        });
    }
    const index = employees.findIndex(e => e.id === id);
    if (index === -1) {
        return res.status(404).json({ message: "Employee not found" });
    }
    employees[index] = {
        id: employee.id,
        name: employee.name.trim(),
        department: employee.department.trim(),
        salary: employee.salary
    };
    res.status(200).json({
        message: "Employee updated successfully",
        employee: employees[index]
    });
});
app.delete("/employees/:id", (req, res) => {
    const id = validId(req, res);
    if (id === null) return;
    const index = employees.findIndex(e => e.id === id);
    if (index === -1) {
        return res.status(404).json({ message: "Employee not found" });
    }
    const deletedEmployee = employees.splice(index, 1)[0];
    res.status(200).json({
        message: "Employee deleted successfully",
        employee: deletedEmployee
    });
})
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res.status(400).json({ message: "Invalid JSON format" });
    }
    res.status(500).json({ message: "Internal server error" });
});
app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
});
