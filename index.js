const http = require('http');
const url = require('url');

const PORT = process.env.PORT || 3000;

// In-memory storage for todos
let todos = [
    { id: 1, title: 'Sample Todo', completed: false },
    { id: 2, title: 'Another Task', completed: true }
];
let nextId = 3;

// Helper to parse JSON body
const parseBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (err) {
                reject(err);
            }
        });
    });
};

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const method = req.method;

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');

    // Handle preflight
    if (method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    try {
        // GET /todos - Get all todos
        if (path === '/todos' && method === 'GET') {
            res.writeHead(200);
            res.end(JSON.stringify({ success: true, data: todos }));
        }
        
        // GET /todos/:id - Get single todo
        else if (path.match(/^\/todos\/\d+$/) && method === 'GET') {
            const id = parseInt(path.split('/')[2]);
            const todo = todos.find(t => t.id === id);
            
            if (todo) {
                res.writeHead(200);
                res.end(JSON.stringify({ success: true, data: todo }));
            } else {
                res.writeHead(404);
                res.end(JSON.stringify({ success: false, message: 'Todo not found' }));
            }
        }
        
        // POST /todos - Create new todo
        else if (path === '/todos' && method === 'POST') {
            const body = await parseBody(req);
            
            if (!body.title) {
                res.writeHead(400);
                res.end(JSON.stringify({ success: false, message: 'Title is required' }));
                return;
            }
            
            const newTodo = {
                id: nextId++,
                title: body.title,
                completed: body.completed || false
            };
            
            todos.push(newTodo);
            res.writeHead(201);
            res.end(JSON.stringify({ success: true, data: newTodo }));
        }
        
        // PUT /todos/:id - Update todo
        else if (path.match(/^\/todos\/\d+$/) && method === 'PUT') {
            const id = parseInt(path.split('/')[2]);
            const todoIndex = todos.findIndex(t => t.id === id);
            
            if (todoIndex === -1) {
                res.writeHead(404);
                res.end(JSON.stringify({ success: false, message: 'Todo not found' }));
                return;
            }
            
            const body = await parseBody(req);
            todos[todoIndex] = { ...todos[todoIndex], ...body, id };
            
            res.writeHead(200);
            res.end(JSON.stringify({ success: true, data: todos[todoIndex] }));
        }
        
        // DELETE /todos/:id - Delete todo
        else if (path.match(/^\/todos\/\d+$/) && method === 'DELETE') {
            const id = parseInt(path.split('/')[2]);
            const todoIndex = todos.findIndex(t => t.id === id);
            
            if (todoIndex === -1) {
                res.writeHead(404);
                res.end(JSON.stringify({ success: false, message: 'Todo not found' }));
                return;
            }
            
            todos.splice(todoIndex, 1);
            res.writeHead(200);
            res.end(JSON.stringify({ success: true, message: 'Todo deleted' }));
        }
        
        // Root endpoint
        else if (path === '/' && method === 'GET') {
            res.writeHead(200);
            res.end(JSON.stringify({
                success: true,
                message: 'Todo API Server',
                endpoints: {
                    'GET /todos': 'Get all todos',
                    'GET /todos/:id': 'Get single todo',
                    'POST /todos': 'Create todo (body: { title, completed })',
                    'PUT /todos/:id': 'Update todo',
                    'DELETE /todos/:id': 'Delete todo'
                }
            }));
        }
        
        // 404 Not Found
        else {
            res.writeHead(404);
            res.end(JSON.stringify({ success: false, message: 'Route not found' }));
        }
    } catch (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ success: false, message: 'Server error', error: err.message }));
    }
});

server.listen(PORT, () => {
    console.log(`Todo API Server is running on http://localhost:${PORT}`);
    console.log(`Available endpoints:`);
    console.log(`  GET    /todos      - Get all todos`);
    console.log(`  GET    /todos/:id  - Get single todo`);
    console.log(`  POST   /todos      - Create todo`);
    console.log(`  PUT    /todos/:id  - Update todo`);
    console.log(`  DELETE /todos/:id  - Delete todo`);
    console.log(`Press Ctrl+C to stop the server`);
});
