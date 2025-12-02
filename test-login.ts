async function testLogin() {
  console.log('Testing login API...\n')
  
  const credentials = {
    email: 'admin@nexuserp.com',
    password: 'admin123'
  }
  
  console.log('Sending request to: http://localhost:3001/api/auth/login')
  console.log('With credentials:', credentials)
  
  try {
    const response = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
    
    console.log('\nResponse status:', response.status)
    console.log('Response headers:', Object.fromEntries(response.headers.entries()))
    
    const data = await response.json()
    console.log('\nResponse body:', JSON.stringify(data, null, 2))
    
    if (response.ok) {
      console.log('\n✓ Login successful!')
    } else {
      console.log('\n✗ Login failed!')
    }
  } catch (error) {
    console.error('\n✗ Error:', error)
  }
}

testLogin()
