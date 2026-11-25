EMPLOYEE MANAGEMENT REST API
B.Tech 2nd Year - Full Stack Web Development Practical

1. REQUIREMENTS
- Node.js installed
- Visual Studio Code
- Postman (or Thunder Client extension in VS Code)

2. HOW TO RUN
- Extract this ZIP file.
- Open the employee-management-api folder in VS Code.
- Open Terminal > New Terminal.
- Run: npm install
- Run: npm start
- You should see: Server is running at http://localhost:3000

Keep the terminal running while testing the API.

3. API ROUTES
Method   URL                         Work
GET      http://localhost:3000/employees       Get all employees
GET      http://localhost:3000/employees/1     Get employee by ID
POST     http://localhost:3000/employees       Add employee
PUT      http://localhost:3000/employees/1     Update employee
DELETE   http://localhost:3000/employees/1     Delete employee
GET      http://localhost:3000/employees?department=IT
                                          Get employees by department

4. POST REQUEST BODY
In Postman, select POST, enter:
http://localhost:3000/employees

Choose Body > raw > JSON and enter:
{
  "id": 3,
  "name": "Neha",
  "department": "IT",
  "salary": 45000
}

Expected status: 201 Created

5. PUT REQUEST BODY
Select PUT and enter:
http://localhost:3000/employees/1

Choose Body > raw > JSON and enter:
{
  "id": 1,
  "name": "Riya Sharma",
  "department": "HR",
  "salary": 50000
}

Expected status: 200 OK
For this practical, PUT replaces all employee details, so send all four fields.
The id in the JSON body must match the id in the URL.

6. DELETE
Select DELETE and enter:
http://localhost:3000/employees/2

Expected status: 200 OK

7. STATUS CODES
200 - Request successful
201 - Employee created successfully
400 - A field is missing/invalid, or the ID is invalid
404 - Employee not found
409 - Employee ID already exists
500 - Server error

8. IMPORTANT
The employee list is stored in an array in server.js. This is in-memory
storage, not MongoDB. Data added or changed through the API will reset
when the server is stopped or restarted.
