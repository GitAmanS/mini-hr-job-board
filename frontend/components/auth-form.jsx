'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Link from 'next/link';

const baseSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const registerSchema = baseSchema.extend({
  role: z.enum(['recruiter', 'candidate'])
});

const baseApi = process.env.NEXT_PUBLIC_API_URL;

export function AuthForm({ type }) {
  const form = useForm({
    resolver: zodResolver(type === 'register' ? registerSchema : baseSchema),
    defaultValues: {
      ...(type === 'register' && { role: 'candidate' })
    }
  });

  const onSubmit = async (values) => {
    const payload = type === 'register' ? values : {
      email: values.email,
      password: values.password
    };

    const response = await fetch(`${baseApi}/api/auth/${type}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const { token, role } = await response.json();
      localStorage.setItem('token', token);
      window.location.href = role === 'recruiter' ? '/dashboard/jobs' : '/jobs';
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {type === 'register' && (
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-4"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="candidate" />
                        </FormControl>
                        <FormLabel>Candidate</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="recruiter" />
                        </FormControl>
                        <FormLabel>Recruiter</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button type="submit" className="w-full">
            {type === 'login' ? 'Sign In' : 'Create Account'}
          </Button>
        </form>
      </Form>

      <p className="mt-4 text-center">
        {type === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
        <Link
          href={type === 'login' ? '/register' : '/login'}
          className="text-blue-500 hover:underline"
        >
          {type === 'login' ? 'Sign up' : 'Sign in'}
        </Link>
      </p>
    </div>
  );
}
