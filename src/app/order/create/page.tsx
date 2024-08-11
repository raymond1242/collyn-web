"use client";

import { Form, Input, Button, Switch, Select } from "antd";
import { useState, useEffect } from "react";
import moment from "moment";
import { ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { createOrder } from "@/services";

interface ImageFile {
  id: string;
  file: File;
}

export default function CreateOrder() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [pendingPayment, setPendingPayment] = useState(0);
  const [advancePayment, setAdvancePayment] = useState(0);
  const [price, setPrice] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPendingPayment(price - advancePayment);
  }, [price, advancePayment]);

  const buildShippingDate = (date: string, time: string): string => {
    const dateTime = moment(date + ' ' + time, 'YYYY-MM-DD HH:mm');
    return dateTime.format('YYYY-MM-DDThh:mm');

  }

  const [images, setImages] = useState<ImageFile[]>([]);

  const onChangeInputFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files).map(file => ({
        id: URL.createObjectURL(file),
        file
      }));
      setImages(prevImages => prevImages.concat(filesArray));
      event.target.value = ''; 
    }
  };

  const onFinish = (values: any) => {
    setLoading(true);
    const shippingDate = buildShippingDate(values.deliveryDate, values.deliveryTime);

    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('product', values.product);
    formData.append('description', values.description);
    formData.append('price', values.price);
    formData.append('advance_payment', String(advancePayment));
    formData.append('pending_payment', String(pendingPayment));
    formData.append('registration_place', values.location);
    formData.append('shipping_place', values.shippingPlace);
    formData.append('shipping_date', shippingDate);
    formData.append('has_production', values.prod ? 'true' : 'false');

    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i].file);
    }

    createOrder(formData).then((response) => {
      setLoading(false);
      router.push('/order');
    }).catch((error) => {
      setLoading(false);
      console.error(error);
    })
  };

  return (
    <main className="flex flex-col gap-3 bg-whitew-full py-4 px-6">
      <p
        className="flex flex-row gap-2 cursor-pointer text-primary font-light"
        onClick={() => {
          router.back();
        }}
      >
        <ArrowLeftOutlined />
        Atrás
      </p>
      <div className="flex flex-col mx-auto gap-5 lg:w-[500px] w-full p-4">
        <p className="text-[44px] font-semibold">Crear pedido</p>
        <Form
            name="order"
            onFinish={onFinish}
            form={form}
            layout="vertical"
            initialValues={
              {
                pendingPayment: pendingPayment
              }
            }
          >
            <div className="grid grid-cols-3 gap-4">
              <Form.Item
                name="location"
                label="Tienda Origen"
                className="col-span-2"
                rules={[{ required: true, message: "Por favor seleccione una tienda" }]}
              >
                <Select
                  size="large"
                  options={[
                    { value: 'Loreto', label: 'Loreto' },
                    { value: 'Esquina', label: 'Esquina' },
                    { value: 'Alameda', label: 'Alameda' },
                    { value: 'Ucayali', label: 'Ucayali' },
                    { value: 'Central', label: 'Central' },
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
              <Input className="border-primary" />
            </Form.Item>
            <Form.Item
              name="product"
              label="Producto"
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
              rules={[{ required: true, message: "Por favor ingrese una descripción" }]}
            >
              <Input.TextArea
                rows={4}
                placeholder="Descripción"
                className="border-primary"
              />
            </Form.Item>
            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                name="shippingPlace"
                label="Lugar de entrega"
                rules={[{ required: true, message: "Por favor ingrese un lugar de entrega" }]}
              >
                <Select
                  size="large"
                  options={[
                    { value: 'Loreto', label: 'Loreto' },
                    { value: 'Esquina', label: 'Esquina' },
                    { value: 'Alameda', label: 'Alameda' },
                    { value: 'Ucayali', label: 'Ucayali' },
                    { value: 'Central', label: 'Central' },
                  ]}
                />
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
                  className="border border-neutral-300 py-2 px-3 bg-neutral-100 rounded-md w-40"
                >
                  {pendingPayment}
                </p>
              </Form.Item>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                name="deliveryDate"
                label="Fecha entrega (mm/dd/aa)"
                initialValue={moment().format('MM/DD/YY')}
                rules={[{ required: true, message: "Por favor ingrese una fecha de entrega" }]}
              >
                <Input type="date" className="border-primary" min={moment().format('MM/DD/YY')} /> 
              </Form.Item>
              <Form.Item
                name="deliveryTime"
                label="Hora entrega"
                initialValue={moment().format('HH:mm')}
                rules={[{ required: true, message: "Por favor ingrese una hora de entrega" }]}
              >
                <Input className="border-primary" type="time" />
              </Form.Item>
            </div>
            <Form.Item
              name="images"
            >
              <div className="flex flex-col gap-2 mt-3">
                <div>
                  <label
                    htmlFor="input-file"
                    className="flex gap-2 cursor-pointer bg-white border border-primary rounded-lg p-2 w-fit text-primary"
                  >
                    <UploadOutlined className="text-primary" />
                    Subir imagenes
                  </label>
                  <input
                    type='file'
                    id="input-file"
                    multiple
                    accept='image/png, image/jpeg'
                    onChange={onChangeInputFile}
                    style={{ display: 'none' }}
                  ></input>
                </div>
                <div className="flex flex-wrap gap-4 mt-4">
                  {images.map(image => (
                    <div key={image.id}>
                      <img src={image.id} alt="Selected" width="140" />
                    </div>
                  ))}
                </div>
              </div>
            </Form.Item>
            <Form.Item className="mb-2 text-right">
              <Button
                loading={loading}
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
