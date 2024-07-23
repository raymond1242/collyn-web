import { Table, Modal, Button, Select, Checkbox, Tag, DatePicker } from "antd";
import type { TableProps } from "antd";
import CreateOrder from "@/components/CreateOrder";
import moment from "moment";
import { useState } from "react";
import { EditFilled } from "@ant-design/icons";

const { RangePicker } = DatePicker;

export interface Order {
  id: number;
  name: string;
  description: string;
  location: string;
  registeredDate: string;
  deliveryDate: moment.Moment;
  deliveryTime: string;
  deliveryPlace: string;
  delivered: boolean;
  comment: string;
  advance: number;
  prod: boolean;
  price: number;
}

const ordersMock: Order[] = [
  {
    id: 1,
    name: "Torta de chocolate",
    description: "Esta es una torta de chocolate, este es un texto largo para ver si se ajusta bien",
    location: "Ucayali",
    registeredDate: "2023/01/01",
    deliveryDate: moment(),
    deliveryTime: "12:00",
    deliveryPlace: "Ucayali",
    comment: "Este es un comentario",
    advance: 10,
    prod: false,
    delivered: false,
    price: 100
  },
  {
    id: 2,
    name: "Torta de Vainilla para Jorge",
    description: "Esta es una torta de papas",
    location: "Loreto",
    registeredDate: "2023/01/01",
    deliveryDate: moment().add(1, 'hour'),
    deliveryTime: "13:00",
    deliveryPlace: "Loreto",
    comment: "Este es un comentario",
    advance: 25,
    prod: true,
    delivered: true,
    price: 40
  }
];

const columns: TableProps<Order>["columns"] = [
  {
    title: "",
    dataIndex: "id",
    key: "id",
    render: (_, record) => (
      <Button
        className="border-0 rounded-full"
        icon={<EditFilled className="text-blue-700" />}
        onClick={() => console.log(record)}
      />
    ),
  },
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
    render: (text: string) => <p>{text}</p>,
  },
  {
    title: "Precio",
    dataIndex: "price",
    key: "price",
    render: (text: number) => <p>{text}</p>,
  },
  
  {
    title: "Adelanto",
    dataIndex: "advance",
    key: "advance",
    render: (text: number) => <p>{text}</p>,
  },
  {
    title: "Pendiente",
    dataIndex: "price",
    key: "price",
    render: (_, record) => <p>{record.price - record.advance}</p>,
  },
  {
    title: "Recepción",
    dataIndex: "location",
    key: "location",
    render: (text: string) => <p>{text}</p>,
  },
  {
    title: "Fecha registro", 
    dataIndex: "registeredDate",
    key: "registeredDate",
    render: (text: string) => <p>{text}</p>,
  },
  {
    title: "Fecha entrega",
    dataIndex: "deliveryDate",
    key: "deliveryDate",
    render: (date: moment.Moment) => <p>{date.format('DD/MM/YY')}</p>,
  },
  {
    title: "Hora entrega",
    dataIndex: "deliveryTime",
    key: "deliveryDate",
    render: (date: string) => <p>{date}</p>,
  },
  {
    title: "Lugar entrega",
    dataIndex: "deliveryPlace",
    key: "deliveryPlace",
    render: (text: string) => <p className="text-center">{text}</p>,
  },
  {
    title:"PROD",
    dataIndex: "prod",
    key: "prod",
    render: (text: boolean) => text ? (
      <div className="text-center">
        <Tag className="rounded-md bg-blue-700 text-white border-blue-700">Si</Tag>
      </div>
    ) : (
      <div className="text-center">
        <Tag className="rounded-md text-neutral-400">No</Tag>
      </div>
    ),
  },
  {
    title: "Entregado",
    dataIndex: "delivered",
    key: "delivered",
    render: (text: boolean) => (
      <div className="text-center">
        <Checkbox checked={text} />
      </div>
    ),
  }
];

export default function OrderList () {
  const [orders, setOrders] = useState<Order[]>(ordersMock);
  const [completedOrders, setCompletedOrders] = useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [openModal, setOpenModal] = useState(false);
  
  const handleAddOrder = (order: Order) => {
    setOrders([...orders, order]);
  }

  const handleCompleteOrder = () => {
    setCompletedOrders([...completedOrders, currentOrder!]);
    setCurrentOrder(null);
    setOrders(orders.filter((order) => order.id !== currentOrder?.id));
  }

  const dateFilter = [
    "Hoy",
    "Mañana",
    "Próximos 7 días",
    "Próximos 30 días",
  ]

  return (
    <section className="grid gap-4 py-2">
      <div className="flex justify-between py-2">
        <div className="flex gap-2 items-center">
          {dateFilter.map((date, key) => (
            <Button key={key} className="rounded-lg text-blue-700 border-blue-700 border">
              {date}
            </Button>
          ))}
          <RangePicker className="rounded-lg text-blue-700 border-blue-700 border" />
        </div>
        <CreateOrder orders={orders} onAddOrder={handleAddOrder} />
      </div>
      <Table
        dataSource={orders}
        columns={columns}
        pagination={false}
        size="middle"
        className="hover:cursor-pointer"
        rowKey={(record) => record.id}
        locale={{emptyText: 'No hay pedidos'}}
      />
      <Modal
        open={openModal}
        onCancel={() => {
          setOpenModal(false);
        }}
        width={600}
        footer={null}
      >
        <div className="flex flex-col w-full">
          <p className="text-3xl font-medium mb-6">
            {currentOrder?.name}
          </p>
          <p className="text-lg font-medium mb-2">
            Fecha de entrega:&nbsp;
            <span className="text-gray-600 text-xl font-normal">
              {currentOrder?.deliveryDate.format('HH:mm DD/MM')}
            </span>
          </p>
          <p className="text-base font-light mb-2">
            {currentOrder?.description}
          </p>
          <p className="text-lg font-medium mb-4">
            Comentarios:
            <br />
            <span className="text-base font-light">
              {currentOrder?.comment}
            </span>
          </p>
          <Button
            size="large"
            onClick={() => {
              setOpenModal(false);
              handleCompleteOrder();
            }}
            className="mb-1"
          >
            Completado
          </Button>
        </div>
      </Modal>
    </section>
  );
}
