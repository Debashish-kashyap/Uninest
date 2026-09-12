// Quick API test script
async function test() {
  const BASE = 'http://localhost:5000';

  // 1. Register Owner
  console.log('\n=== 1. Register Owner ===');
  let res = await fetch(`${BASE}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Rahul Sharma',
      email: 'rahul@owner.com',
      password: 'password123',
      role: 'owner'
    })
  });
  const owner = await res.json();
  console.log(res.status, JSON.stringify(owner, null, 2));
  const ownerToken = owner.token;

  // 2. Register Student
  console.log('\n=== 2. Register Student ===');
  res = await fetch(`${BASE}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Priya Deka',
      email: 'priya@student.com',
      password: 'password123',
      role: 'student',
      verificationType: 'email',
      universityEmail: 'priya@gauhati.university.edu'
    })
  });
  const student = await res.json();
  console.log(res.status, JSON.stringify(student, null, 2));
  const studentToken = student.token;

  // 3. Login Owner
  console.log('\n=== 3. Login Owner ===');
  res = await fetch(`${BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'rahul@owner.com', password: 'password123' })
  });
  console.log(res.status, JSON.stringify(await res.json(), null, 2));

  // 4. Create PG (Owner)
  console.log('\n=== 4. Create PG (Owner) ===');
  res = await fetch(`${BASE}/api/pg`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ownerToken}`
    },
    body: JSON.stringify({
      title: 'Lakhimi Students Home',
      description: 'Premium PG near Gauhati University',
      price: 5000,
      location: 'Jalukbari, Guwahati',
      lat: 26.1540,
      lng: 91.6620,
      availability: true
    })
  });
  const pg = await res.json();
  console.log(res.status, JSON.stringify(pg, null, 2));
  const pgId = pg._id;

  // 5. Get All PGs
  console.log('\n=== 5. Get All PGs ===');
  res = await fetch(`${BASE}/api/pg`);
  const allPgs = await res.json();
  console.log(res.status, `Found ${allPgs.length} PG(s)`);

  // 6. Add Review (Student)
  console.log('\n=== 6. Add Review (Student) ===');
  res = await fetch(`${BASE}/api/pg/${pgId}/review`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${studentToken}`
    },
    body: JSON.stringify({ rating: 5, comment: 'Excellent PG near campus!' })
  });
  console.log(res.status, JSON.stringify(await res.json(), null, 2));

  // 7. Get PG with reviews
  console.log('\n=== 7. Get PG with Reviews ===');
  res = await fetch(`${BASE}/api/pg/${pgId}`);
  const pgDetail = await res.json();
  console.log(res.status, `Title: ${pgDetail.title}, AvgRating: ${pgDetail.avgRating}, Reviews: ${pgDetail.reviews.length}`);

  // 8. Get owner's PGs
  console.log('\n=== 8. Owner PGs ===');
  res = await fetch(`${BASE}/api/pg/owner`, {
    headers: { 'Authorization': `Bearer ${ownerToken}` }
  });
  const ownerPgs = await res.json();
  console.log(res.status, `Owner has ${ownerPgs.length} PG(s)`);

  // 9. Filter PGs
  console.log('\n=== 9. Filter PGs (location=Guwahati) ===');
  res = await fetch(`${BASE}/api/pg?location=Guwahati`);
  const filtered = await res.json();
  console.log(res.status, `Found ${filtered.length} PG(s) matching "Guwahati"`);

  // 10. Role-based access test
  console.log('\n=== 10. Student tries to create PG (should fail) ===');
  res = await fetch(`${BASE}/api/pg`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${studentToken}`
    },
    body: JSON.stringify({ title: 'Illegal PG', price: 100, location: 'Test' })
  });
  console.log(res.status, JSON.stringify(await res.json(), null, 2));

  console.log('\n✅ ALL TESTS COMPLETE');
}

test().catch(console.error);
