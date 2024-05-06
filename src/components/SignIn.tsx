import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const SignUpSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(3).max(20)
});
type SignUpSchemaType = z.infer<typeof SignUpSchema>;

export default function SignUpForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<SignUpSchemaType>({ resolver: zodResolver(SignUpSchema) });

    const navigate = useNavigate()

    const { login } = useAuth();

    const onSubmit: SubmitHandler<SignUpSchemaType> = async (data) => {
        try {
            const response = await fetch('https://6637a59e288fedf69380ea26.mockapi.io/api/v1/classes/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const userData = await response.json();
                login(userData);
                reset();
                navigate("/")
            } else {
                alert('Authentication failed');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg m-10">
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                <input
                    id="name"
                    type="text"
                    className="border border-gray-300 rounded-md p-2 w-full"
                    placeholder="Enter your name"
                    {...register("name")}
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
            </div>

            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                <input
                    id="email"
                    type="email"
                    className="border border-gray-300 rounded-md p-2 w-full"
                    placeholder="Enter your email"
                    {...register("email")}
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                <input
                    id="password"
                    type="password"
                    className="border border-gray-300 rounded-md p-2 w-full"
                    placeholder="Enter your password"
                    {...register("password")}
                />
                {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>

            <button type="submit" className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 transition duration-200">Sign In</button>
        </form>
    );
}
