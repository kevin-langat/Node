import type { Server } from 'bun'

interface User {
  id: number,
  name: string
}

interface APIResponse {
  message: string,
  method: string,
  route: string,
  data?: User | User[]
}

const users: User[] = [
  {
    id: 1,
    name: "Kevin"
  },
  {
    id: 2,
    name: "John"
  },
  {
    id: 3,
    name: "Charly"
  },
  {
    id: 4,
    name: "Vannessa"
  },
  {
    id: 5,
    name: "Irma"
  },
]

const server: Server<never> = Bun.serve({
  port: 5000,
  fetch(req: Request): Response {
    const url = new URL(req.url)
    const method = req.method;

    let response: APIResponse = {
      message: "Hello from Bun Server",
      method: method,
      route: url.pathname
    };

    if (url.pathname === '/') {

      if (method === 'GET') {

        response.message = "Welcome to Bun API!"
      } else {
        response.message = "Method not allowed for this route"
      }
    } else if (url.pathname === '/users') {
      switch (method) {
        case 'GET':
          response.message = "Fetching all users",
            response.data = users
          break;
        case 'POST':
          response.message = "Adding a new user"
          break;
        default:
          response.message = "Method not allowed for this route"
          break;
      }

    }

    return Response.json(response)
  }
})

console.log('Bun server is now runnig on http://localhost:5000')