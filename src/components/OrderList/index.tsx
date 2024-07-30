import { Table, Button, Checkbox, Tag, DatePicker } from "antd";
import type { TableProps } from "antd";
import moment from "moment";
import { useState, useEffect } from "react";
import { EditFilled } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { Order, OrdersApiService } from "@/services";

const { RangePicker } = DatePicker;

const ordersMock: Order[] = [
  {
    id: "1",
    name: "Torta de chocolate",
    description: "Esta es una torta de chocolate, este es un texto largo para ver si se ajusta bien",
    registrationPlace: "Ucayali",
    createdAt: new Date(),
    shippingDate: new Date(),
    shippingPlace: "Ucayali",
    advancePayment: "10",
    pendingPayment: "10",
    hasProduction: false,
    delivered: false,
    company: 1,
    price: "100"
  },
  {
    id: "2",
    name: "Torta de chocolate",
    description: "Esta es una torta de chocolate, este es un texto largo para ver si se ajusta bien",
    registrationPlace: "Ucayali",
    createdAt: new Date(),
    shippingDate: new Date(),
    shippingPlace: "Ucayali",
    advancePayment: "10",
    pendingPayment: "10",
    hasProduction: true,
    delivered: false,
    company: 1,
    price: "100"
  },
];

const columns: TableProps<Order>["columns"] = [
  {
    title: "",
    dataIndex: "id",
    key: "id",
    render: (_, record) => (
      < Button
        className="border-0 bg-white rounded-full"
        icon={<EditFilled className="text-primary" />}
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
    dataIndex: "advancePayment",
    key: "advancePayment",
    render: (text: string) => <p>{text}</p>,
  },
  {
    title: "Pendiente",
    dataIndex: "price",
    key: "price",
    render: (_, record) => <p>{record.pendingPayment}</p>,
  },
  {
    title: "Recepción",
    dataIndex: "shippingPlace",
    key: "location",
    render: (text: string) => <p>{text}</p>,
  },
  {
    title: "Fecha registro", 
    dataIndex: "createdAt",
    key: "registeredDate",
    render: (text: Date) => <p>{moment(text).format('DD/MM/YY')}</p>,
  },
  {
    title: "Fecha entrega",
    dataIndex: "shippingDate",
    key: "shippingDate",
    render: (date: Date) => <p>{moment(date).format('DD/MM/YY')}</p>,
  },
  {
    title: "Hora entrega",
    dataIndex: "shippingDate",
    key: "shippingDate",
    render: (date: Date) => <p>{moment(date).format('HH:mm')}</p>,
  },
  {
    title: "Lugar entrega",
    dataIndex: "shippingPlace",
    key: "shippingPlace",
    render: (text: string) => <p>{text}</p>,
  },
  {
    title:"PROD",
    dataIndex: "hasProduction",
    key: "hasProduction",
    render: (text: boolean) => text ? (
      <div className="text-center">
        <Tag className="rounded-md bg-primary text-white border-primary">Si</Tag>
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
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const ordersApi = OrdersApiService();

  useEffect(() => {
    ordersApi.ordersList().then((response) => {
      setOrders(response);
    });
  }, []);

  const dateFilter = [
    // "Hoy",
    "Mañana",
    "Próximos 7 días",
    "Próximos 30 días",
  ]

  return (
    <section className="grid gap-4 py-2">
      <div className="flex justify-between py-2">
        <div className="flex gap-2 items-center">
          <Button type="primary" className="rounded-lg">
            Hoy
          </Button>
          {dateFilter.map((date, key) => (
            <Button key={key} className="rounded-lg">
              {date}
            </Button>
          ))}
          <RangePicker className="rounded-lg text-primary border-primary border" />
        </div>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            setLoading(true);
            router.push('/order/create');
          }}
          loading={loading}
        >
          Crear pedido
        </Button>
      </div>
      <Table
        dataSource={orders}
        columns={columns}
        pagination={false}
        size="middle"
        className="hover:cursor-pointer"
        rowKey={(record) => record.id as string}
        locale={{emptyText: 'No hay pedidos'}}
      />
    </section>
  );
}
