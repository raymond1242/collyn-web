import Image from "next/image";
import { Order } from "@/services";
import { useState, useEffect } from "react";
import { EditFilled } from "@ant-design/icons";
import { Button, Modal, Form, Input, Select, Switch } from "antd";
import { OrdersApiService } from "@/services";
import { useAuthContext } from "@/contexts/AuthContext";

import moment from "moment";
import 'moment/locale/es';

interface OrderEditModalProps {
  record: Order;
  isAdmin: boolean;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

export default function OrderEditModal ({record, isAdmin, orders, setOrders }: OrderEditModalProps) {
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [locationOptions, setLocationOptions] = useState<Array<{ value: string, label: string }>>([]);
  const [pendingPayment, setPendingPayment] = useState(Number(record.pendingPayment));
  const [advancePayment, setAdvancePayment] = useState(Number(record.advancePayment));
  const [price, setPrice] = useState(Number(record.price));
  const [loading, setLoading] = useState(false);

  const { companyStores } = useAuthContext();
  const ordersApi = OrdersApiService();

  const createDateTime = (date: string, time: string): Date => {
    const dateTime = moment(date + ' ' + time, 'YYYY-MM-DD HH:mm');
    return dateTime.toDate();
  }

  const updateStore = (values: any) => {
    ordersApi.ordersUpdateStore({
      id: record.id as string,
      data: {
        advancePayment: String(advancePayment),
        pendingPayment: String(pendingPayment),
        shippingDate: createDateTime(values.deliveryDate, values.deliveryTime)
      }
    }).then((response) => {
      setLoading(false);
      setOrders(orders.map(
        order => (
          order.id === record.id ? {
            ...order,
            advancePayment: response.advancePayment,
            pendingPayment: response.pendingPayment,
            shippingDate: response.shippingDate
          } : order
        )
      ));
      setOpenModal(false);
    }).catch((error) => {
      setLoading(false);
      setOpenModal(false);
      console.error(error);
    });
  }

  const updateAdmin = (values: any) => {
    ordersApi.ordersUpdateAdmin({
      id: record.id as string,
      data: {
        name: values.name,
        product: values.product,
        description: values.description,
        price: String(price),
        advancePayment: String(advancePayment),
        pendingPayment: String(pendingPayment),
        shippingPlace: values.shippingPlace,
        shippingDate: createDateTime(values.deliveryDate, values.deliveryTime),
        hasProduction: values.prod,
        hasDelivery: values.delivery,
      }
    }).then((response) => {
      setLoading(false);
      console.log(response);
      setOrders(orders.map(
        order => (
          order.id === record.id ? {
            ...order,
            name: response.name,
            product: response.product,
            description: response.description,
            price: response.price,
            advancePayment: response.advancePayment,
            pendingPayment: response.pendingPayment,
            shippingPlace: response.shippingPlace,
            shippingDate: response.shippingDate,
            hasProduction: response.hasProduction,
            hasDelivery: response.hasDelivery,
          } : order
        )
      ));
      setOpenModal(false);
    }).catch((error) => {
      setLoading(false);
      setOpenModal(false);
      console.error(error);
    });
  }

  const onFinish = (values: any) => {
    setLoading(true);
    if (isAdmin) {
      updateAdmin(values);
    } else if (!isAdmin) {
      updateStore(values);
    } else {
      setLoading(false);
      console.error("No tiene permisos para editar el pedido");
    }
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
        <div className={`grid grid-cols-1 gap-2 items-center ${Number(record?.images?.length) > 0 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'}`}>
          {Number(record?.images?.length) > 0 && (
            <div className="flex lg:flex-col flex-wrap justify-center gap-4 lg:order-first order-last">
              {record?.images?.map((image, index) => (
                <div key={index}>
                  <p className="text-base absolute font-medium bg-red-600 text-white w-fit px-2 py-1 rounded-lg">{index + 1}</p>
                  <Image
                    key={image.image!}
                    src={image.image!}
                    alt="Order image"
                    width={350}
                    height={300}
                    className="rounded-xl bg-neutral-100 border"
                  />
                </div>
              ))}
            </div>
          )}
          <div className="lg:py-6 py-4 lg:px-4 p-1 col-span-2 flex flex-col justify-center gap-4">
            <p className="text-center text-2xl font-light">Editar pedido</p>
            <Form
              name={record.id}
              onFinish={onFinish}
              form={form}
              layout="vertical"
              initialValues={
                {
                  name: record.name,
                  product: record.product,
                  description: record.description,
                  registrationPlace: record.registrationPlace,
                  shippingPlace: record.shippingPlace,
                  hasProduction: record.hasProduction,
                  hasDelivery: record.hasDelivery,
                  images: record.images,
                }
              }
            >
              {isAdmin && (
                <>
                  <div className="grid grid-cols-4 gap-4 -mb-2">
                    <Form.Item
                      name="name"
                      label="Nombre"
                      className="col-span-2"
                      rules={[{ required: true, message: "Por favor ingrese un nombre" }]}
                    >
                      <Input
                        className="border-primary"
                      />
                    </Form.Item>
                    <Form.Item
                      name="hasProduction"
                      label="Producción"
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                    <Form.Item
                      name="hasDelivery"
                      label="Envio"
                      valuePropName="checked"
                    >
                      <Switch />
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
                      options={locationOptions}
                    />
                  </Form.Item>
                </>
              )}
              <div className="grid grid-cols-2 gap-4">
                <Form.Item
                  name="deliveryDate"
                  label="Fecha entrega (mm/dd/aa)"
                  initialValue={moment(record.shippingDate).format('YYYY-MM-DD')}
                  >
                  <Input type="date" className="border-primary" /> 
                </Form.Item>
                <Form.Item
                  name="deliveryTime"
                  label="Hora entrega"
                  initialValue={moment(record.shippingDate).format('HH:mm')}
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
                    disabled={!isAdmin}
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
