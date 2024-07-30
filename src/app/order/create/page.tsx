"use client";

import { Form, Input, Button, Switch, Select } from "antd";
import { useState } from "react";
import moment from "moment";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { OrdersApiService } from "@/services/api";

export default function CreateOrder() {
  const [form] = Form.useForm();
  const router = useRouter();
  const ordersApi = OrdersApiService();

  const buildShippingDate = (date: string, time: string) => {
    const dateTime = moment(date + ' ' + time, 'DD/MM/YY HH:mm');
    return dateTime.toDate();
  }

  const onFinish = (values: any) => {
    const shippingDate = buildShippingDate(values.deliveryDate, values.deliveryTime);
    console.log(shippingDate);

    const requestParamas = {
      data: {
        name: values.name,
        description: values.description,
        registrationPlace: values.location,
        shippingPlace: values.shippingPlace,
        shippingDate: shippingDate,
        advancePayment: values.advancePayment,
        pendingPayment: values.pendingPayment,
        hasProduction: values.prod,
        company: 1,
        price: values.price
      }
    }

    console.log(requestParamas);

    // ordersApi.ordersCreate(requestParamas).then((response) => {
    //   console.log(response);
    // });

  };

  return (
    <main className="flex flex-col gap-3 bg-white h-screen w-full py-4 px-6">
      <p
        className="flex flex-row gap-2 cursor-pointer text-primary font-light"
        onClick={() => {
          router.back();
        }}
      >
        <ArrowLeftOutlined />
        Atrás
      </p>
      <div className="flex flex-col mx-auto gap-5 lg:w-[480px] w-full p-4">
        <p className="text-[44px] font-semibold">Crear pedido</p>
        <Form
            name="order"
            onFinish={onFinish}
            form={form}
            layout="vertical"
          >
            <div className="grid grid-cols-3 gap-4">
              <Form.Item
                name="location"
                label="Tienda"
                className="col-span-2"
                rules={[{ required: true, message: "Por favor seleccione una tienda" }]}
              >
                <Select
                  size="large"
                  options={[
                    { value: "1", label: 'Tienda 1' },
                    { value: "2", label: 'Tienda 2' },
                    { value: "3", label: 'Tienda 3' },
                    { value: "4", label: 'Tienda 4', disabled: true },
                  ]}
                />
              </Form.Item>
              <Form.Item
                name="prod"
                label="Producción"
                valuePropName="checked"
                initialValue={false}
              >
                <Switch />
              </Form.Item>
            </div>
            <Form.Item
              name="name"
              label="Nombre"
              rules={[{ required: true, message: "Por favor ingrese un nombre" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Descripción"
              rules={[{ required: true, message: "Por favor ingrese una descripción" }]}
            >
              <Input.TextArea placeholder="Descripción" />
            </Form.Item>
            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                name="shippingPlace"
                label="Lugar de entrega"
                rules={[{ required: true, message: "Por favor ingrese un lugar de entrega" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="phoneNumber"
                label="Número de teléfono"
              >
                <Input type="number" className="w-full" />
              </Form.Item>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Form.Item
                name="price"
                label="Precio"
                initialValue={1}
                rules={[{ required: true, message: "Por favor ingrese un precio" }]}
              >
                <Input type="number" className="w-full" />
              </Form.Item>
              <Form.Item
                name="advancePayment"
                label="Adelanto"
                initialValue={1}
                rules={[{ required: true, message: "Por favor ingrese una cantidad" }]}
              >
                <Input type="number" className="w-full" />
              </Form.Item>
              <Form.Item
                name="pendingPayment"
                label="Pendiente"
                initialValue={1}
              >
                <Input disabled className="w-full" />
              </Form.Item>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                name="deliveryDate"
                label="Fecha entrega (mm/dd/aa)"
                initialValue={moment().format('DD/MM/YY')}
                rules={[{ required: true, message: "Por favor ingrese una fecha de entrega" }]}
              >
                <Input type="date" min={moment().format('DD/MM/YY')} />
              </Form.Item>
              <Form.Item
                name="deliveryTime"
                label="Hora entrega"
                initialValue={moment().format('HH:mm')}
                rules={[{ required: true, message: "Por favor ingrese una hora de entrega" }]}
              >
                <Input type="time" />
              </Form.Item>
            </div>
            <Form.Item>
              <Input type="image" className="w-full" />
            </Form.Item>
            <Form.Item className="mb-2 text-right">
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                className="w-full"
              >
                Crear pedido
              </Button>
            </Form.Item>
          </Form>
      </div>
    </main>
  );
}
