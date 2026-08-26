export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: '🚗 Canguruber Driving School REST API',
    version: '1.0.0',
    description: 'Official interactive API documentation for Canguruber Driving School (NSW, Australia). Powered by Express, TypeScript, and PostgreSQL.'
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Local Development Server'
    }
  ],
  tags: [
    { name: 'Health', description: 'System health check endpoints' },
    { name: 'Bookings', description: 'Driving session and test car hire booking management' },
    { name: 'Contact Inquiries', description: 'Student & instructor contact form submissions' },
    { name: 'Services', description: 'Driving lesson packages & pricing' },
    { name: 'Test Locations', description: 'Service NSW test centres and available time slots' },
    { name: 'Content & Statistics', description: 'Verified student reviews and pass statistics' }
  ],
  paths: {
    '/api/health': {
      get: {
        tags: ['Health'],
        summary: 'Check API server health status',
        responses: {
          '200': {
            description: 'Server is healthy and reachable',
            content: {
              'application/json': {
                example: {
                  status: 'healthy',
                  service: 'Canguruber Driving School API Backend',
                  timestamp: '2026-08-26T06:30:00.000Z',
                  database: 'PostgreSQL'
                }
              }
            }
          }
        }
      }
    },
    '/api/bookings': {
      post: {
        tags: ['Bookings'],
        summary: 'Create a new driving lesson or car hire booking',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['fullName', 'email', 'phone', 'date', 'timeSlot'],
                properties: {
                  serviceId: { type: 'string', example: 'driving-lesson' },
                  locationId: { type: 'string', example: 'loc-01' },
                  transmission: { type: 'string', example: 'automatic' },
                  date: { type: 'string', example: '2026-09-15' },
                  timeSlot: { type: 'string', example: '09:30 AM - 11:00 AM' },
                  fullName: { type: 'string', example: 'Alex Smith' },
                  email: { type: 'string', example: 'alex@example.com' },
                  phone: { type: 'string', example: '0412345678' },
                  licenceType: { type: 'string', example: 'NSW Learner Licence' },
                  pickupAddress: { type: 'string', example: '124 Botany Rd, Mascot' },
                  notes: { type: 'string', example: 'Prefer morning drive' }
                }
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'Booking created successfully',
            content: {
              'application/json': {
                example: {
                  success: true,
                  message: 'Booking created successfully!',
                  bookingId: 'BOOK-473276-968',
                  data: {
                    id: 'BOOK-473276-968',
                    serviceId: 'driving-lesson',
                    fullName: 'Alex Smith',
                    email: 'alex@example.com',
                    status: 'confirmed'
                  }
                }
              }
            }
          },
          '400': { description: 'Missing required booking fields' }
        }
      },
      get: {
        tags: ['Bookings'],
        summary: 'Retrieve all bookings',
        parameters: [
          { name: 'status', in: 'query', schema: { type: 'string' }, description: 'Filter by status (confirmed, pending, cancelled)' },
          { name: 'email', in: 'query', schema: { type: 'string' }, description: 'Filter by student email address' }
        ],
        responses: {
          '200': {
            description: 'List of bookings returned successfully'
          }
        }
      }
    },
    '/api/bookings/{id}': {
      get: {
        tags: ['Bookings'],
        summary: 'Get single booking by ID',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' }, example: 'BOOK-473276-968' }
        ],
        responses: {
          '200': { description: 'Booking detail' },
          '404': { description: 'Booking not found' }
        }
      }
    },
    '/api/bookings/{id}/status': {
      patch: {
        tags: ['Bookings'],
        summary: 'Update booking status',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' }, example: 'BOOK-473276-968' }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: { type: 'string', example: 'confirmed' }
                }
              }
            }
          }
        },
        responses: {
          '200': { description: 'Status updated' },
          '404': { description: 'Booking not found' }
        }
      }
    },
    '/api/contact': {
      post: {
        tags: ['Contact Inquiries'],
        summary: 'Submit a new contact form inquiry',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'email', 'message'],
                properties: {
                  name: { type: 'string', example: 'Sarah Connor' },
                  email: { type: 'string', example: 'sarah@example.com' },
                  phone: { type: 'string', example: '0488776655' },
                  suburb: { type: 'string', example: 'Marrickville' },
                  serviceInterest: { type: 'string', example: 'car-hire-test' },
                  message: { type: 'string', example: 'I have a test scheduled next Tuesday at Botany Service NSW.' }
                }
              }
            }
          }
        },
        responses: {
          '201': { description: 'Inquiry submitted successfully' },
          '400': { description: 'Missing required fields' }
        }
      },
      get: {
        tags: ['Contact Inquiries'],
        summary: 'List all submitted contact inquiries',
        responses: {
          '200': { description: 'List of inquiries' }
        }
      }
    },
    '/api/services': {
      get: {
        tags: ['Services'],
        summary: 'Fetch all driving lesson packages and car hire services',
        responses: {
          '200': { description: 'List of available services' }
        }
      }
    },
    '/api/services/{id}': {
      get: {
        tags: ['Services'],
        summary: 'Fetch single service detail',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' }, example: 'driving-lesson' }
        ],
        responses: {
          '200': { description: 'Service details' },
          '404': { description: 'Service not found' }
        }
      }
    },
    '/api/locations': {
      get: {
        tags: ['Test Locations'],
        summary: 'Fetch all Service NSW test centres covered',
        responses: {
          '200': { description: 'List of test locations' }
        }
      }
    },
    '/api/locations/timeslots': {
      get: {
        tags: ['Test Locations'],
        summary: 'Fetch available booking time slots',
        responses: {
          '200': { description: 'List of time slots' }
        }
      }
    },
    '/api/content/reviews': {
      get: {
        tags: ['Content & Statistics'],
        summary: 'Fetch verified student reviews and rating breakdown',
        responses: {
          '200': { description: 'List of reviews' }
        }
      }
    },
    '/api/content/stats': {
      get: {
        tags: ['Content & Statistics'],
        summary: 'Fetch academy pass rate and student statistics',
        responses: {
          '200': { description: 'Statistics summary' }
        }
      }
    }
  }
};
