const bcrypt = require('bcryptjs');

const testPassword = async () => {
    const password = '123456'; // The password you are testing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log('Hashed Password:', hashedPassword); // Store this for comparison later

    // Later, verify the password
    const isMatch = await bcrypt.compare(password, hashedPassword);
    console.log('Password match:', isMatch); // Should print true if the passwords match
};

// Call the async function
testPassword();
