import { Button, Modal, Input, InputNumber, Form, DatePicker, Checkbox } from "antd";
import { useState } from "react";
import type { Order } from "@/components/OrderList";
import moment from "moment";

export default function CreateOrder({ orders, onAddOrder }: { orders: Order[], onAddOrder: (order: Order) => void }) {
  const [open, setOpen] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    onAddOrder({
      id: orders.length + 1,
      name: values.name,
      description: values.description,
      comment: "",
      deliveryDate: moment(values.deliveryDate.format('DD/MM/YYYY HH:mm'), 'DD/MM/YYYY HH:mm'),
      quantity: values.quantity,
      price: values.price,
      paid: isPaid,
    });
    setOpen(false);
    form.resetFields();
  };

  return (
    <section className="text-right">
      <Button
        className=""
        size="large"
        onClick={() => {
          setOpen(true);
        }}
      >
        Agregar pedido
      </Button>
      <Modal
        open={open}
        width={500}
        onCancel={() => {
          setOpen(false);
        }}
        footer={null}
      >
        <div className="flex flex-col w-full">
          <p className="text-3xl font-medium mb-6">
            Crear pedido
          </p>
          <Form
            name="order"
            onFinish={onFinish}
            form={form}
            layout="vertical"
          >
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
                name="quantity"
                label="Cantidad"
                initialValue={1}
                rules={[{ required: true, message: "Por favor ingrese una cantidad" }]}
              >
                <InputNumber min={1} className="w-full" />
              </Form.Item>
              <Form.Item
                name="price"
                label="Precio"
                initialValue={1}
                rules={[{ required: true, message: "Por favor ingrese un precio" }]}
              >
                <InputNumber min={1} className="w-full" />
              </Form.Item>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Form.Item
                name="deliveryDate"
                label="Fecha de entrega"
                rules={[{ required: true, message: "Por favor ingrese una fecha de entrega" }]}
              >
                <DatePicker showNow={false} showTime={true} showSecond={false} minuteStep={15} />
              </Form.Item>
              <Form.Item
                name="paid"
                label="Pagado?"
                // valuePropName="checked"
                // rules={[{ required: true, message: "Por favor ingrese si el pedido fue pagado o no" }]}
              >
                <Checkbox checked={isPaid} onChange={(e) => setIsPaid(e.target.checked)} />
              </Form.Item>
            </div>
            <Form.Item className="mb-2 text-right">
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                className="w-40"
              >
                Crear pedido
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </section>
  );
}
