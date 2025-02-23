import Image from "next/image";
import { Order } from "@/services";
import { useState, useEffect } from "react";
import { EditFilled, UploadOutlined } from "@ant-design/icons";
import { Button, Modal, Form, Input, Select, Switch } from "antd";
import { OrdersApiService, OrderImageApiService, OrderImage, createOrderImage } from "@/services";
import { useAuthContext } from "@/contexts/AuthContext";

import moment from "moment";
import 'moment/locale/es';

interface OrderEditModalProps {
  record: Order;
  isAdmin: boolean;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  disabled: boolean;
}

interface ImageFile {
  id: string;
  file: File;
}

export default function OrderEditModal ({record, isAdmin, orders, setOrders, disabled }: OrderEditModalProps) {
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [locationOptions, setLocationOptions] = useState<Array<{ value: string, label: string }>>([]);
  const [pendingPayment, setPendingPayment] = useState(Number(record.pendingPayment));
  const [advancePayment, setAdvancePayment] = useState(Number(record.advancePayment));
  const [price, setPrice] = useState(Number(record.price));
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<(OrderImage | undefined)[] | undefined>(record.images);
  const [uploadedImages, setUploadedImages] = useState<ImageFile[]>([]);
  const [loadingUploadedImages, setLoadingUploadedImages] = useState(false);
  const [disabledUploadedImages, setDisabledUploadedImages] = useState(false);
  const [loadingRemoveImage, setLoadingRemoveImage] = useState(false);
  const [disabledRemoveImage, setDisabledRemoveImage] = useState(false);

  const { companyStores } = useAuthContext();
  const ordersApi = OrdersApiService();
  const orderImageApi = OrderImageApiService();

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
        hasProduction: values.hasProduction,
        phoneNumber: values.phoneNumber,
        hasTopper: values.hasTopper,
        hasDelivery: values.hasDelivery,
      }
    }).then((response) => {
      setLoading(false);
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
            phoneNumber: response.phoneNumber,
            hasTopper: response.hasTopper,
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

  const handleRemoveImage = (selectedImage: OrderImage | undefined) => {
    setLoadingRemoveImage(true);
    setDisabledRemoveImage(true);
    orderImageApi.orderImagesDelete({
      id: selectedImage?.id as string
    }).then((response) => {
      setImages(prevImages => prevImages?.filter(image => image?.id !== selectedImage?.id));
      setLoadingRemoveImage(false);
      setDisabledRemoveImage(false);
    }).catch((error) => {
      console.error(error);
    });
  }

  const handleAddImage = (selectedImage: ImageFile) => {
    setLoadingUploadedImages(true);
    setDisabledUploadedImages(true);
    const formData = new FormData();
    formData.append('image', selectedImage.file);
    formData.append('order', record.id as string);

    createOrderImage(formData).then((response) => {
      setImages(prevImages => prevImages?.concat(response));
      setLoadingUploadedImages(false);
      setDisabledUploadedImages(false);
      setUploadedImages(prevImages => prevImages.filter(image => image.id !== selectedImage.id));
    }).catch((error) => {
      console.error(error);
    });
  }

  const onChangeInputFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files).map(file => ({
        id: URL.createObjectURL(file),
        file
      }));
      setUploadedImages(prevImages => prevImages.concat(filesArray));
      event.target.value = ''; 
    }
  };

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
        disabled={disabled}
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
        <div className="grid lg:grid-cols-3 grid-cols-2 gap-2 items-center">
          <div className="flex flex-col gap-4 lg:order-first lg:col-span-1 col-span-2 order-last py-2">
            <div className="flex lg:flex-col flex-wrap justify-center gap-4">
              {images?.map((image, index) => (
                <div key={index} className="border-2 border-primary bg-primary rounded-lg h-fit">
                  <div className="flex justify-between items-start mb-0.5">
                    <p className="text-sm font-semibold bg-white text-primary w-fit px-2 py-0.5 rounded-lg">
                      {index + 1}
                    </p>
                    <Button
                      onClick={() => handleRemoveImage(image)}
                      className="btn-danger"
                      loading={loadingRemoveImage}
                      disabled={disabledRemoveImage}
                    >
                      Eliminar
                    </Button>
                  </div>
                  <Image
                    key={image?.image!}
                    src={image?.image!}
                    alt="Order image"
                    width={350}
                    height={300}
                    className="rounded-lg bg-neutral-100"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              {uploadedImages.map((image, index) => (
                <div key={image.id}>
                  <Button
                    type="primary"
                    className="absolute w-fit z-10"
                    onClick={() => handleAddImage(image)}
                    loading={loadingUploadedImages}
                    disabled={disabledUploadedImages}
                  >
                    Agregar
                  </Button>
                  <Image src={image.id} alt="Selected" width={160} height={100} />
                </div>
              ))}
            </div>
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
          </div>
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
                  hasTopper: record.hasTopper,
                  hasDelivery: record.hasDelivery,
                  phoneNumber: record.phoneNumber,
                  images: record.images,
                }
              }
            >
              {isAdmin && (
                <>
                  <div className="grid grid-cols-5 gap-4 -mb-2">
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
                      name="hasTopper"
                      label="Topper"
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
                  <div className="grid grid-cols-2 gap-4">
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
                    <Form.Item
                      name="phoneNumber"
                      label="Numero de teléfono"
                      rules={[{ required: true, message: "Por favor ingrese un lugar de entrega" }]}
                    >
                      <Input
                        className="border-primary"
                      />
                    </Form.Item>
                  </div>
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
