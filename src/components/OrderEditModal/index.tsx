import { Order } from "@/services";
import { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Select, Switch } from "antd";
import { EditFilled } from "@ant-design/icons";
import Image from "next/image";
import { useAuthContext } from "@/contexts/AuthContext";

import moment from "moment";
import 'moment/locale/es';

export default function OrderEditModal ({ record, isAdmin }: { record: Order, isAdmin: boolean }) {
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [locationOptions, setLocationOptions] = useState<Array<{ value: string, label: string }>>([]);
  const [pendingPayment, setPendingPayment] = useState(0);
  const [advancePayment, setAdvancePayment] = useState(0);
  const [price, setPrice] = useState(1);
  const [loading, setLoading] = useState(false);

  const { companyStores } = useAuthContext();

  const onFinish = (values: any) => {
    console.log(values);
  }

  useEffect(() => {
    setLocationOptions(companyStores.map(store => ({ value: store.name, label: store.name })));
  }, [companyStores]);

  useEffect(() => {
    setPendingPayment(price - advancePayment);
  }, [price, advancePayment]);

  return (
    <>
      <Button
        className="rounded-full"
        icon={<EditFilled />}
        onClick={() => {
          setOpenModal(true);
        }}
      />
      <Modal
        centered
        open={openModal}
        width={900}
        onCancel={() => setOpenModal(false)}
        footer={null}
      >
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-2">
          <div className="flex lg:flex-col flex-wrap justify-center items-center gap-4 lg:order-first order-last">
            {record?.images?.map(image => (
              <Image
                key={image.image!}
                src={image.image!}
                alt="Order image"
                width={340}
                height={300}
                className="rounded-xl bg-neutral-100 border"
              />
            ))}
          </div>
          <div className="lg:py-6 py-4 lg:px-4 p-1 col-span-2 flex flex-col gap-3">
            <p className="text-center text-lg font-light">Editar pedido</p>
            <Form
              name="editOrder"
              onFinish={onFinish}
              form={form}
              layout="vertical"
              initialValues={
                {
                  name: record.name,
                  product: record.product,
                  description: record.description,
                  price: record.price,
                  advancePayment: record.advancePayment,
                  pendingPayment: record.pendingPayment,
                  registrationPlace: record.registrationPlace,
                  shippingPlace: record.shippingPlace,
                  hasProduction: record.hasProduction,
                  hasDelivery: record.hasDelivery,
                  images: record.images,
                }
              }
            >
              <div className="grid grid-cols-4 gap-4 -mb-2">
                <Form.Item
                  name="name"
                  label="Nombre"
                  className="col-span-2"
                  rules={[{ required: true, message: "Por favor ingrese un nombre" }]}
                >
                  <Input
                    disabled={!isAdmin}
                    className="border-primary"
                  />
                </Form.Item>
                <Form.Item
                  name="hasProduction"
                  label="Producción"
                  valuePropName="checked"
                  initialValue={false}
                >
                  <Switch disabled={!isAdmin} />
                </Form.Item>
                <Form.Item
                  name="hasDelivery"
                  label="Envio"
                  valuePropName="checked"
                  initialValue={false}
                >
                  <Switch disabled={!isAdmin} />
                </Form.Item>
              </div>
              <Form.Item
                name="product"
                label="Producto"
                className="mb-3"
                rules={[{ required: true, message: "Por favor ingrese los productos" }]}
              >
                <Input.TextArea
                  rows={3}
                  disabled={!isAdmin}
                  placeholder="Productos"
                  className="border-primary"
                />
              </Form.Item>
              <Form.Item
                name="description"
                label="Descripción"
                className="mb-3"
                rules={[{ required: true, message: "Por favor ingrese una descripción" }]}
              >
                <Input.TextArea
                  rows={4}
                  disabled={!isAdmin}
                  placeholder="Descripción"
                  className="border-primary"
                />
              </Form.Item>
              <Form.Item
                name="shippingPlace"
                label="Lugar de entrega"
                rules={[{ required: true, message: "Por favor ingrese un lugar de entrega" }]}
              >
                <Select
                  size="large"
                  className={!isAdmin ? '' : 'disabled-selector'}
                  disabled={!isAdmin}
                  options={locationOptions}
                />
              </Form.Item>
              <div className="grid grid-cols-2 gap-4">
                <Form.Item
                  name="deliveryDate"
                  label="Fecha entrega (mm/dd/aa)"
                  rules={[{ required: true, message: "Por favor ingrese una fecha de entrega" }]}
                  >
                  <Input type="date" className="border-primary" min={moment().format('MM/DD/YY')} /> 
                </Form.Item>
                <Form.Item
                  name="deliveryTime"
                  label="Hora entrega"
                  rules={[{ required: true, message: "Por favor ingrese una hora de entrega" }]}
                  >
                  <Input className="border-primary" type="time" />
                </Form.Item>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Form.Item
                  name="price"
                  label="Precio"
                  initialValue={price}
                  rules={[{ required: true, message: "Por favor ingrese un precio" }]}
                >
                  <Input
                    min={1}
                    type="number"
                    className="w-full border-primary"
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                </Form.Item>
                <Form.Item
                  name="advancePayment"
                  label="Adelanto"
                  initialValue={advancePayment}
                  rules={[{ required: true, message: "Por favor ingrese una cantidad" }]}
                >
                  <Input
                    min={0}
                    max={price}
                    type="number"
                    className="w-full border-primary"
                    onChange={(e) => setAdvancePayment(Number(e.target.value))}
                  />
                </Form.Item>
                <Form.Item
                  name="pendingPayment"
                  label="Pendiente"
                >
                  <p
                    className="border border-neutral-300 py-2 px-3 bg-neutral-100 rounded-md lg:w-40 w-full"
                  >
                    {pendingPayment}
                  </p>
                </Form.Item>
              </div>
              <Form.Item className="mb-2 text-right">
                <Button
                  loading={loading}
                  type="primary"
                  size="large"
                  htmlType="submit"
                  className="w-full"
                >
                  Editar pedido
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
}
