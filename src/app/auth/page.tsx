"use client";

import { Form, Input, Button } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthApiService, AuthService } from "@/services";

export default function Auth() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const authApi = AuthApiService();

  const onFinish = (values: any) => {
    setLoading(true);
    console.log(values);

    const requestParamas = {
      data: {
        username: values.username,
        password: values.password
      }
    }

    authApi.authLogin(requestParamas).then((response) => {
      console.log(response);
      AuthService.setAuthToken(response.key);
      AuthService.setUserName(response.user.username);
      router.push('/order');
    });
  };

  return (
    <main className="flex gap-4 justify-center items-center h-screen">
      <div className="flex flex-col lg:gap-5 gap-4 lg:w-96 p-6">
        <p className="text-5xl font-semibold">Iniciar sesión</p>
        <Form
          form={form}
          onFinish={onFinish}
          name="signin"
          layout="vertical"
        >
          <Form.Item
            name="username"
            label="Usuario"
            rules={[{ required: true, message: "Por favor ingrese un usuario" }]}
          >
            <Input className="border-primary" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Contraseña"
            rules={[{ required: true, message: "Por favor ingrese una contraseña" }]}
          >
            <Input.Password className="border-primary" />
          </Form.Item>
          <Form.Item className="mb-1">
            <Button
              size="large"
              htmlType="submit"
              className="w-full"
              loading={loading}
            >
              Iniciar sesión
            </Button>
          </Form.Item>
        </Form>
      </div>
    </main>
  );
}
