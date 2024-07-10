const { z } = require('zod');

const signupSchema = z.object({

    username: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "Name must be atleast 3 characters" })
        .max(255, { message: "Name must not be more than 255 characters" }),

    email: z
        .string({required_error:"Email is required"})
        .trim()
        .email({message:"Invalid email address"}),
    
    phone: z
        .string({required_error:"Phone Number is required"})
        .trim()
        .min(10,{message:"Phone number must be atleast 10 characters"})
        .max(15,{message:"Phone number must not be more than 15 characters"}),

    password: z
    .string({required_error:"Password is required"})
    .min(7,{message:"Password must be atleast 7 characters"}),
})

const loginSchema = z.object({
    email: z
        .string({required_error:"Email is required"})
        .trim()
        .email({message:"Invalid email address"}),
        
    password:z
    .string({required_error:"Password is required"})
    .min(7,{message:"Password must be atleast 7 characters"}),
})
module.exports = {signupSchema,loginSchema};