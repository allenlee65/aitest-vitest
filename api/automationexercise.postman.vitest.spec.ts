import { describe, it, expect } from 'vitest';

const base = 'https://automationexercise.com';

// Helper to measure response time
async function timedFetch(input: string | URL | Request, init?: RequestInit) {
const start = Date.now();
const res = await fetch(input, init);
return { res, ms: Date.now() - start };
}

describe('Automationexercise (converted from Postman items)', () => {
// API 02: POST To All Products List
it('API 02: POST To All Products List', async () => {
const { res, ms } = await timedFetch(`${base}/api/productsList`, { method: 'POST' });

text
// Response status 200
expect(res.status).toBe(200);

// Response time < 800ms
expect(ms).toBeLessThan(800);

// Content-Type includes 'text/html; charset=utf-8'
const ct = res.headers.get('Content-Type') || res.headers.get('content-type') || '';
expect(ct).toContain('text/html; charset=utf-8');

// Body has responseCode and message; responseCode is a non-negative integer
const body = await res.json();
expect(body && typeof body).toBe('object');
expect(Object.keys(body).sort()).toEqual(['message', 'responseCode']);
expect(typeof body.responseCode).toBe('number');
expect(Number.isInteger(body.responseCode)).toBe(true);
expect(body.responseCode).toBeGreaterThanOrEqual(0);
});

// API 01: Get All Products List
it('API 01: Get All Products List', async () => {
const { res, ms } = await timedFetch(`${base}/api/productsList`, { method: 'GET' });

text
// Status 200
expect(res.status).toBe(200);

// Content-Type includes text/html
const ct = res.headers.get('Content-Type') || res.headers.get('content-type') || '';
expect(ct).toContain('text/html');

// Response time < 2000ms
expect(ms).toBeLessThan(2000);

const data = await res.json();

// products array not empty
expect(data && typeof data).toBe('object');
expect(Array.isArray(data.products)).toBe(true);
expect(data.products.length).toBeGreaterThan(0);

// Per-product schema checks (exact keys)
for (const product of data.products) {
  expect(product && typeof product).toBe('object');
  expect(Object.keys(product).sort()).toEqual(['brand', 'category', 'id', 'name', 'price']);
  expect(typeof product.id).toBe('number');
  expect(typeof product.name).toBe('string');
  expect(typeof product.price).toBe('string');
  expect(typeof product.brand).toBe('string');

  expect(product.category && typeof product.category).toBe('object');
  expect(Object.keys(product.category).sort()).toEqual(['category', 'usertype']);
  expect(product.category.usertype && typeof product.category.usertype).toBe('object');
  expect(Object.keys(product.category.usertype)).toEqual(['usertype']);
  expect(typeof product.category.category).toBe('string');
}

// Duplicate check for required fields
for (const product of data.products) {
  expect(Object.keys(product).sort()).toEqual(['brand', 'category', 'id', 'name', 'price']);
}
});

// API 14: GET user account detail by email
it('API 14: GET user account detail by email', async () => {
const email = 'allenlee@punkproof.com';
const { res, ms } = await timedFetch(`${base}/api/getUserDetailByEmail?email=${encodeURIComponent(email)}`);

text
// Status 200 and response time < 800ms
expect(res.status).toBe(200);
expect(ms).toBeLessThan(800);

const data = await res.json();
expect(data && typeof data).toBe('object');

// Postman assertion expects 'user' object with required fields
expect(data.user).toBeDefined();

const requiredFields = [
  'id', 'name', 'email', 'title', 'birth_day', 'birth_month', 'birth_year',
  'first_name', 'last_name', 'company', 'address1', 'address2',
  'country', 'state', 'city', 'zipcode'
];
for (const field of requiredFields) {
  expect(data.user).toHaveProperty(field);
}

// Email format
const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
expect(typeof data.user.email).toBe('string');
expect(data.user.email).toMatch(emailRegex);

// User ID non-negative integer
expect(typeof data.user.id).toBe('number');
expect(Number.isInteger(data.user.id)).toBe(true);
expect(data.user.id).toBeGreaterThanOrEqual(0);
});

// API 11: POST To Create/Register User Account (request points to updateAccount in the attachment)
it('API 11: POST To Create/Register User Account (request to updateAccount)', async () => {
const form = new URLSearchParams();
form.set('name', 'first last');
form.set('email', 'abc@cde.com');
form.set('password', 'password');
form.set('title', 'Mr');
form.set('birth_date', '1');
form.set('birth_month', '1');
form.set('birth_year', '2000');
form.set('firstname', 'first');
form.set('lastname', 'last');
form.set('company', 'company');
form.set('address1', 'address1');
form.set('address2', '');
form.set('country', 'Taiwan');
form.set('zipcode', '111068');
form.set('state', 'what');
form.set('city', 'Taipei');
form.set('mobile_number', '+886 908987987');

text
const { res, ms } = await timedFetch(\`\${base}/api/updateAccount\`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: form.toString()
});

// Postman expectations in the attachment:
// - status 405
// - content-type includes application/json
// - body has 'detail'
// - response time < 200ms
expect(res.status).toBe(405);

const ct = res.headers.get('Content-Type') || res.headers.get('content-type') || '';
expect(ct).toContain('application/json');

const body = await res.json();
expect(body && typeof body).toBe('object');
expect(body).toHaveProperty('detail');

expect(ms).toBeLessThan(200);
});

// API 12: DELETE METHOD To Delete User Account
it('API 12: DELETE METHOD To Delete User Account', async () => {
const form = new URLSearchParams();
form.set('email', '');
form.set('password', '');

text
const { res, ms } = await timedFetch(\`\${base}/api/deleteAccount\`, {
  method: 'DELETE',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: form.toString()
});

expect(res.status).toBe(200);

const body = await res.json();
expect(body && typeof body).toBe('object');
expect(Object.keys(body).sort()).toEqual(['message', 'responseCode']);

expect(ms).toBeLessThan(200);
});

// API 10: POST To Verify Login with invalid details
it('API 10: POST To Verify Login with invalid details', async () => {
const form = new URLSearchParams();
form.set('email', '');
form.set('password', '(invalid values)'); // preserved intent

text
const res = await fetch(\`\${base}/api/verifyLogin\`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: form.toString()
});

expect(res.status).toBe(200);

const body = await res.json();
expect(body && typeof body).toBe('object');
expect(Object.keys(body).sort()).toEqual(['message', 'responseCode']);
expect(typeof body.responseCode).toBe('number');
expect(Number.isInteger(body.responseCode)).toBe(true);
expect(typeof body.message).toBe('string');
expect(body.message.length).toBeGreaterThan(0);
});

// API 04: PUT To All Brands List
it('API 04: PUT To All Brands List', async () => {
const { res, ms } = await timedFetch(`${base}/api/brandsList`, { method: 'PUT' });

text
expect(res.status).toBe(200);

const body = await res.json();
expect(body && typeof body).toBe('object');
expect(body).toHaveProperty('responseCode');

expect(ms).toBeLessThan(200);
});
});
