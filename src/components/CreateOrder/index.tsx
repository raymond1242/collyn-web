import { Button, Modal, Input, Form, Checkbox, Select } from "antd";
import { useState } from "react";
import type { Order } from "@/components/OrderList";
import moment from "moment";
import { ShopOutlined } from "@ant-design/icons";

export default function CreateOrder({ orders, onAddOrder }: { orders: Order[], onAddOrder: (order: Order) => void }) {
  const [open, setOpen] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    onAddOrder({
      id: orders.length + 1,
      name: values.name,
      description: values.description,
      location: values.location,
      registeredDate: moment().format('YYYY/MM/DD'),
      comment: "",
      deliveryDate: moment(`${values.deliveryDate} ${values.deliveryTime}`, 'YYYY-MM-DD HH:mm'),
      deliveryTime: values.deliveryTime,
      deliveryPlace: values.deliveryPlace,
      price: values.price,
      prod: values.prod,
      delivered: false,
      advance: values.advance
    });
    setOpen(false);
    form.resetFields();
  };

  const handleChangeLocation = (value: string) => {
    console.log(value);
  }

  return (
    <section className="text-left">
      <Button
        className="bg-blue-700 border-blue-700 text-white"
        size="large"
        onClick={() => {
          setOpen(true);
        }}
      >
        Crear pedido
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
          <div className="flex gap-2">
            <ShopOutlined className="text-2xl text-red-500 items-center" />
            <Select
              defaultValue="1"
              size="large"
              onChange={handleChangeLocation}
              options={[
                { value: '1', label: 'Tienda 1' },
                { value: '2', label: 'Tienda 2' },
                { value: '3', label: 'Tienda 3' },
                { value: '4', label: 'Tienda 4', disabled: true },
              ]}
            />
          </div>
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
                <Input type="number" className="w-full" />
              </Form.Item>
              <Form.Item
                name="price"
                label="Precio"
                initialValue={1}
                rules={[{ required: true, message: "Por favor ingrese un precio" }]}
              >
                <Input type="number" className="w-full" />
              </Form.Item>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Form.Item
                name="deliveryDate"
                label="Fecha de entrega (mm/dd/yy)"
                initialValue={moment().format('DD/MM/YY')}
                rules={[{ required: true, message: "Por favor ingrese una fecha de entrega" }]}
              >
                <Input type="date" min={moment().format('DD/MM/YY')} />
              </Form.Item>
              <Form.Item
                name="deliveryTime"
                label="Hora de entrega"
                initialValue={moment().format('HH:mm')}
                rules={[{ required: true, message: "Por favor ingrese una hora de entrega" }]}
              >
                <Input type="time" />
              </Form.Item>
              <Form.Item
                name="paid"
                label="Pagado?"
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
