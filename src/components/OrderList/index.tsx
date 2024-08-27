import { Table, Button, Tag, DatePicker, Select } from "antd";
import type { TableProps } from "antd";
import moment from "moment";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Order, OrdersApiService, CompanyApiService, UserCompanyRoleEnum } from "@/services";
import OrderViewerModal from "@/components/OrderViewerModal";
import OrderEditModal from "@/components/OrderEditModal";
import SwitchConfirmModal from "@/components/SwitchConfirmModal";
import { useAuthContext } from "@/contexts/AuthContext";

const { RangePicker } = DatePicker;

interface FilterButtons {
  label: string;
  startDate: string;
  endDate: string;
}

export default function OrderList () {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [currentFilter, setCurrentFilter] = useState(1);
  const [filterLocation, setFilterLocation] = useState("");
  const [alertTime, setAlertTime] = useState(moment().add(25, "minutes").toDate());
  const [loadingLocations, setLoadingLocations] = useState(true);
  const [locationOptions, setLocationOptions] = useState<Array<{ value: string, label: string }>>([]);
  const [filterDate, setFilterDate] = useState({
    start: moment().format('YYYY-MM-DD'),
    end: moment().add(1, 'day').format('YYYY-MM-DD')
  });

  const router = useRouter();
  const ordersApi = OrdersApiService();
  const companyApi = CompanyApiService();
  const { setCompanyStores, userRole } = useAuthContext();

  const getOrders = () => {
    setLoadingOrders(true);
    ordersApi.ordersList(
      {
        shippingStartDate: filterDate.start,
        shippingEndDate: filterDate.end,
        shippingPlace: filterLocation
      }
    ).then((response) => {
      setOrders(response);
      setLoadingOrders(false);
    }).catch((error) => {
      console.error(error);
      setLoadingOrders(false);
    });
  }

  useEffect(() => {
    getOrders();
  }, [filterDate, filterLocation]);

  useEffect(() => {
    companyApi.companyStores().then((response) => {
      setCompanyStores(response);
      let options = response.map(store => ({ value: store.name, label: store.name }))
      options = [...options, { value: "", label: "Todos" }];
      setLocationOptions(options);
      setLoadingLocations(false);
    }).catch((error) => {
      setLocationOptions([...locationOptions, { value: "", label: "Todos" }]);
      setLoadingLocations(false);
      console.error(error);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getOrders();
      setAlertTime(moment().add(25, "minutes").toDate());
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsAdmin(userRole === UserCompanyRoleEnum.Admin);
  }, [userRole]);

  const columns: TableProps<Order>["columns"] = [
    {
      title: "",
      dataIndex: "id",
      key: "id",
      width: 100,
      render: (_, record) => (
        <div className="flex gap-3 items-center">
          <OrderEditModal record={record} isAdmin={isAdmin} orders={orders} setOrders={setOrders} />
          <OrderViewerModal record={record} />
        </div>
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
      dataIndex: "registrationPlace",
      key: "registrationPlace",
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
      title:"Prod",
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
      title: "Con entrega",
      dataIndex: "hasDelivery",
      key: "hasDelivery",
      render: (text: boolean) => text ? (
        <div className="text-center">
          <Tag className="rounded-md bg-green-600 text-white border-green-600">Si</Tag>
        </div>
      ) : (
        <div className="text-center">
          <Tag className="rounded-md text-neutral-400">No</Tag>
        </div>
      ),
    },
    {
      title: "Completado",
      dataIndex: "completed",
      key: "completed",
      // defaultSortOrder: "ascend",
      // sorter: (a: Order, b: Order) => Number(a.completed) - Number(b.completed),
      render: (completed: boolean, record) => (
        <div className="text-center">
          <SwitchConfirmModal checked={completed} record={record} orders={orders} setOrders={setOrders} />
        </div>
      ),
    }
  ];

  const onChangeDateRange = (dates: any) => {
    setFilterDate({
      start: dates[0].format('YYYY-MM-DD'),
      end: dates[1].format('YYYY-MM-DD')
    })
    setCurrentFilter(0);
  }

  const dateFilter: FilterButtons[] = [
    {
      label: "Hoy",
      startDate: moment().format('YYYY-MM-DD'),
      endDate: moment().add(1, 'day').format('YYYY-MM-DD')
    },
    {
      label: "Mañana",
      startDate: moment().add(1, 'day').format('YYYY-MM-DD'),
      endDate: moment().add(2, 'day').format('YYYY-MM-DD')
    },
    {
      label: "Próximos 7 días",
      startDate: moment().format('YYYY-MM-DD'),
      endDate: moment().add(7, 'day').format('YYYY-MM-DD')
    },
    {
      label: "Próximos 30 días",
      startDate: moment().format('YYYY-MM-DD'),
      endDate: moment().add(30, 'day').format('YYYY-MM-DD')
    },
  ];

  return (
    <section className="grid gap-4 py-2">
      <div className="flex flex-col gap-4 justify-between py-2">
        <Button
          type="primary"
          size="large"
          className="w-fit"
          onClick={() => {
            setLoading(true);
            router.push('/order/create');
          }}
          loading={loading}
        >
          Crear pedido
        </Button>
        <div className="flex justify-between lg:flex-row flex-col gap-4">
          <div className="flex gap-2 items-center">
            <p className="text-base font-light">Filtra por tienda</p>
            <Select
              defaultValue={filterLocation}
              loading={loadingLocations}
              className="w-40"
              onChange={(value: string) => setFilterLocation(value)}
              options={locationOptions}
            />
          </div>
          <div className="flex flex-wrap gap-3">
            {dateFilter.map((date: FilterButtons, key: number) => (
              <Button
                key={key}
                className="rounded-lg"
                onClick={() => {
                  setCurrentFilter(key + 1)
                  setFilterDate({
                    start: date.startDate,
                    end: date.endDate
                  })
                }}
                type={currentFilter === key + 1 ? "primary" : "default"}
              >
                {date.label}
              </Button>
            ))}
            <RangePicker
              className="rounded-lg text-primary border-primary border"
              onChange={onChangeDateRange}
            />
          </div>
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <Table
          dataSource={orders}
          columns={columns}
          rowClassName={
            (record: Order) => (
              record.completed ? '' : record.shippingDate > alertTime ? '' : 'blink'
            )
          }
          size="middle"
          loading={loadingOrders}
          className="hover:cursor-pointer"
          rowKey={(record) => record.id as string}
          locale={{emptyText: 'No hay pedidos'}}
        />
      </div>
      <div>
        <p>Pedidos completados</p>
      </div>
    </section>
  );
}
