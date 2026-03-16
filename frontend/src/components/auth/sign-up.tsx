import { useForm } from "@tanstack/react-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export default function SignUp() {
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      authClient.signUp.email({
        email: values.value.email,
        password: values.value.password,
        name: values.value.username,
      })
    },
  });

  return (
    <form className="container mx-auto p-8 text-center relative z-10">
      <Card className="min-w-md">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          <div className="flex flex-col gap-2 w-full">
            <Label>Username</Label>
            <form.Field 
              name="username"
              children={(field) => (
              <Input 
                placeholder="Username"
                value={field.state.value} 
                onChange={(e) => field.handleChange(e.target.value)} 
              />
            )}>
            </form.Field>
            <Label>Email</Label>
            <form.Field 
              name="email"
              children={(field) => (
              <Input 
                placeholder="Email"
                value={field.state.value} 
                onChange={(e) => field.handleChange(e.target.value)} 
              />
            )}>
            </form.Field>
            <Label>Password</Label>
            <form.Field 
              name="password"
              children={(field) => (
              <Input 
                placeholder="Password"
                type="password"
                value={field.state.value} 
                onChange={(e) => field.handleChange(e.target.value)} 
              />
            )}>
            </form.Field>
            <div className="pt-2 flex flex-col gap-2">
              <Button type="submit">Sign Up</Button>
              <a href="/sign-in" className="text-sm text-gray-500 hover:text-gray-700">
                Already have an account? Sign in
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
