"use client";

import { Form, Input, Button, Switch, Select } from "antd";
import { useState } from "react";
import moment from "moment";
import { ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

interface ImageFile {
  id: string;
  file: File;
}

export default function CreateOrder() {
  const [form] = Form.useForm();
  const router = useRouter();

  const buildShippingDate = (date: string, time: string) => {
    const dateTime = moment(date + ' ' + time, 'DD/MM/YY HH:mm');
    return dateTime.toDate();
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
    const shippingDate = buildShippingDate(values.deliveryDate, values.deliveryTime);

    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('registration_place', values.location);
    formData.append('shipping_place', values.shippingPlace);
    formData.append('shipping_date', shippingDate.toDateString());
    formData.append('advance_payment', values.advancePayment);
    formData.append('pending_payment', values.pendingPayment);
    formData.append('has_production', values.prod);
    formData.append('delivered', values.delivered);

    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i].file);
    }

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
      <div className="flex flex-col mx-auto gap-5 lg:w-[500px] w-full p-4">
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
                label="Tienda Origen"
                className="col-span-2"
                rules={[{ required: true, message: "Por favor seleccione una tienda" }]}
              >
                <Select
                  size="large"
                  options={[
                    { value: "1", label: 'Loreto' },
                    { value: "2", label: 'Esquina' },
                    { value: "3", label: 'Alameda' },
                    { value: "4", label: 'Ucayali' },
                    { value: "5", label: 'Central' },
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
              <Input.TextArea rows={4} placeholder="Descripción" />
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
                    { value: "1", label: 'Loreto' },
                    { value: "2", label: 'Esquina' },
                    { value: "3", label: 'Alameda' },
                    { value: "4", label: 'Ucayali' },
                    { value: "5", label: 'Central' },
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
                initialValue={moment().format('MM/DD/YY')}
                rules={[{ required: true, message: "Por favor ingrese una fecha de entrega" }]}
              >
                <Input type="date" min={moment().format('MM/DD/YY')} /> 
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
