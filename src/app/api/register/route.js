import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(request) {
   
    try {
        const { username, email, password, firstName, lastName, role } = await request.json();

        // Check if the email already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            return Response.json({ message: 'Email already in use',status:409 });
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10); // Adjust the salt rounds as needed
      
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                firstName,
                lastName,
                role: role || 'CUSTOMER',
            },
        });

       
        return Response.json({ message: 'User registered successfully' ,user});
    } catch (error) {
        console.error('Error creating user:', error);
      
        return Response.json({ message: 'Error creating user',status:400 });
    }
}


