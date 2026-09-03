export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: '🚗 Canguruber Driving School REST API',
    version: '1.3.0',
    description: 'Official interactive API documentation for Canguruber Driving School (NSW, Australia). Features JWT auth, conflict-free booking engine, PostgreSQL persistence, and Admin Management Portal.'
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Local Development Server'
    }
  ],
  tags: [
    { name: 'Health', description: 'System health check endpoints' },
    { name: 'Authentication', description: 'User registration, login, and profile retrieval' },
    { name: 'Bookings & Availability', description: 'Driving session booking, conflict checking, auto-assignment, and schedule availability' },
    { name: 'Admin & Operations', description: 'Staff dashboard metrics, instructor roster, fleet management, and student directory' },
    { name: 'Contact Inquiries', description: 'Student & instructor contact form submissions' }
  ],
  paths: {
    '/api/health': {
      get: {
        tags: ['Health'],
        summary: 'Check API server health status',
        responses: {
          '200': { description: 'Server is healthy and reachable' }
        }
      }
    },
    '/api/auth/register': {
      post: {
        tags: ['Authentication'],
        summary: 'Register a new student user account',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['fullName', 'email', 'password'],
                properties: {
                  fullName: { type: 'string', example: 'Alex Smith' },
                  email: { type: 'string', example: 'alex.s@gmail.com' },
                  password: { type: 'string', example: 'securepassword123' },
                  phone: { type: 'string', example: '0412345678' }
                }
              }
            }
          }
        },
        responses: {
          '201': { description: 'User account created and JWT token issued' },
          '400': { description: 'Validation error' },
          '409': { description: 'Email address already exists' }
        }
      }
    },
    '/api/auth/login': {
      post: {
        tags: ['Authentication'],
        summary: 'Authenticate against users table & receive signed JWT',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', example: 'admin@apexdriving.com' },
                  password: { type: 'string', example: 'admin123' }
                }
              }
            }
          }
        },
        responses: {
          '200': { description: 'Login successful, returns JWT bearer token' },
          '401': { description: 'Invalid email address or password' }
        }
      }
    },
    '/api/admin/stats': {
      get: {
        tags: ['Admin & Operations'],
        summary: 'Overview dashboard metrics & status breakdown (Admin & Instructor)',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': { description: 'Summary statistics returned successfully' },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden role' }
        }
      }
    },
    '/api/instructors': {
      get: {
        tags: ['Admin & Operations'],
        summary: 'List all instructors with today booking counts (Admin & Instructor)',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': { description: 'Instructor list returned' },
          '401': { description: 'Unauthorized' }
        }
      }
    },
    '/api/instructors/{id}': {
      patch: {
        tags: ['Admin & Operations'],
        summary: 'Toggle instructor active status (Admin Only)',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['activeStatus'],
                properties: { activeStatus: { type: 'boolean', example: false } }
              }
            }
          }
        },
        responses: {
          '200': { description: 'Instructor active status updated' },
          '403': { description: 'Forbidden: Admin role required' }
        }
      }
    },
    '/api/vehicles': {
      get: {
        tags: ['Admin & Operations'],
        summary: 'List all fleet vehicles with assigned instructors (Admin & Instructor)',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': { description: 'Vehicle list returned' }
        }
      }
    },
    '/api/vehicles/{id}': {
      patch: {
        tags: ['Admin & Operations'],
        summary: 'Toggle vehicle active status (Admin Only)',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['activeStatus'],
                properties: { activeStatus: { type: 'boolean', example: false } }
              }
            }
          }
        },
        responses: {
          '200': { description: 'Vehicle active status updated' },
          '403': { description: 'Forbidden: Admin role required' }
        }
      }
    },
    '/api/admin/students': {
      get: {
        tags: ['Admin & Operations'],
        summary: 'List student users with total booking counts (Admin & Instructor)',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': { description: 'Student directory returned' }
        }
      }
    }
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  }
};
