import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
import bcrypt from 'bcrypt';
var jwt = require('jsonwebtoken');

export async function POST(request) {

    

    try {
        // Parse the incoming request JSON
        const res = await request.json();
        console.log(res.password)
        

        //let JET_TOKEN = process.env.JWT_TOKEN
        //json web token for authentication
        

        const user = await prisma.user.findUnique({
            where: {
                email: res.email,
            },
        });

        if (user) {


            // Email exists in the database, compare passwords
            const passwordMatch = await bcrypt.compare(res.password, user.password);

            console.log(user.password)
            //bcrypt.compareSync(myPlaintextPassword, hash); // true
            if (passwordMatch) {
                //True
                //OK it okay
                
                var token = jwt.sign(res, "token");
       
                // console.log("username",user.email)
                return Response.json({ status: 200, msg: 'Login successful ', token, res })

            }else{
                return Response.json({ status: 500, error: 'Invalid Password' })
            }

        } else {
            // Email does not exist in the database, return an error response

            return Response.json({ status: 404, msg: 'Please Register First' })
        }
    } catch (error) {
        // Handle any unexpected errors

        return Response.json({ status: 500, error: 'Invalid Password' })
    } finally {
        await prisma.$disconnect();
    }
}
