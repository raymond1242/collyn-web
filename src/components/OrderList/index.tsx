import { Table, Button, Tag, DatePicker, Select, Switch, Input } from "antd";
import type { TableProps } from "antd";
import { ShopOutlined } from "@ant-design/icons";
import moment from "moment";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Order, OrdersApiService, UserCompanyRoleEnum } from "@/services";
import OrderViewerModal from "@/components/OrderViewerModal";
import OrderEditModal from "@/components/OrderEditModal";
import SwitchConfirmModal from "@/components/SwitchConfirmModal";
import PrintInvoiceModal from "@/components/PrintInvoiceModal";
import { useAuthContext } from "@/contexts/AuthContext";
import type { GetProps } from 'antd';
import { on } from "events";

const { RangePicker } = DatePicker;
type SearchProps = GetProps<typeof Input.Search>;

interface FilterButtons {
  label: string;
  startDate: string;
  endDate: string;
}

export default function OrderList () {
  const [orders, setOrders] = useState<Order[]>([]);
  const [completedOrders, setCompletedOrders] = useState<Order[]>([]);
  const [loadingCompletedOrders, setLoadingCompletedOrders] = useState(false);
  const [showCompletedOrders, setShowCompletedOrders] = useState(false);
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

  const [productionFilter, setProductionFilter] = useState(false);
  const [topperFilter, setTopperFilter] = useState(false);
  const [filterCode, setFilterCode] = useState('');

  const router = useRouter();
  const ordersApi = OrdersApiService();
  const { companyStores, userRole, userName } = useAuthContext();

  const getOrders = () => {
    setLoadingOrders(true);
    ordersApi.ordersList(
      {
        shippingStartDate: filterDate.start,
        shippingEndDate: filterDate.end,
        shippingPlace: filterLocation,
        hasProduction: productionFilter,
        hasTopper: topperFilter,
        code: filterCode
      }
    ).then((response) => {
      setOrders(response);
      setLoadingOrders(false);
    }).catch((error) => {
      console.error(error);
      setLoadingOrders(false);
    });
  }

  const getCompletedOrders = () => {
    setLoadingCompletedOrders(true);
    ordersApi.ordersCompleted(
      {
        shippingStartDate: filterDate.start,
        shippingEndDate: filterDate.end,
        shippingPlace: filterLocation
      }
    ).then((response) => {
      setCompletedOrders(response);
      setLoadingCompletedOrders(false);
    }).catch((error) => {
      console.error(error);
      setLoadingCompletedOrders(false);
    });
  }

  useEffect(() => {
    getOrders();
  }, [filterDate, filterLocation, productionFilter, topperFilter, filterCode]);

  useEffect(() => {
    let options = companyStores.map(store => ({ value: store.name, label: store.name }))
    options = [...options, { value: "", label: "Todos" }];
    setLocationOptions(options);
    setLoadingLocations(false);
  }, [companyStores]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAlertTime(moment().add(25, "minutes").toDate());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsAdmin(userRole === UserCompanyRoleEnum.Admin);
  }, [userRole]);

  const disableEdit = (record: Order) => {
    if (isAdmin){
      return false;
    }
    if (record.registrationPlace === userName || record.shippingPlace === userName) {
      return false;
    }
    return true;
  };

  const columns: TableProps<Order>["columns"] = [
    {
      title: "",
      dataIndex: "id",
      key: "id",
      width: 100,
      render: (_, record) => (
        <div className="flex gap-2 items-center">
          <OrderEditModal
            record={record}
            isAdmin={isAdmin}
            orders={orders}
            setOrders={setOrders}
            disabled={disableEdit(record)}
          />
          <OrderViewerModal record={record} />
          <PrintInvoiceModal record={record} />
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
      title: "Código",
      dataIndex: "code",
      key: "code",
      render: (text: string) => (
        <div className="text-center">
          <p className="font-semibold text-sm border border-neutral-400  p-1 rounded-md">{text}</p>
        </div>
      ),
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
      render: (date: Date) => (
        <p className="font-medium text-base">{moment(date).format('DD/MM/YY')}</p>
      ),
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
      title: "Topper",
      dataIndex: "hasTopper",
      key: "hasTopper",
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
      title: "Delivery",
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
      render: (completed: boolean, record) => (
        <div className="text-center">
          <SwitchConfirmModal
            checked={completed}
            disabled={disableEdit(record)}
            record={record}
            orders={orders}
            setOrders={setOrders}
            completedOrders={completedOrders}
            setCompletedOrders={setCompletedOrders}
          />
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
        <div className="flex flex-wrap gap-2 mb-2">
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
          {isAdmin && (
            <Button
              size="large"
              className="btn-secondary w-fit"
              disabled
              onClick={() => {
                router.push('/company');
              }}
            >
              Administrar usuarios
            </Button>
          )}
        </div>
        <div className="lg:w-[420px] w-full flex flex-row gap-2 items-center">
          <p className="font-light w-28">Buscar por:</p>
          <Input.Search
            onChange={(e) => setFilterCode(e.target.value)}
            placeholder="Código de pedido"
            loading={loadingOrders}
          />
        </div>
        <div className="flex justify-between lg:flex-row flex-col gap-5">
          <div className="flex gap-1.5 items-center">
            <ShopOutlined className="text-red-600 text-2xl" />
            <p className="font-light">Lugar de entrega</p>
            <Select
              defaultValue={filterLocation}
              loading={loadingLocations}
              className="w-40"
              onChange={(value: string) => setFilterLocation(value)}
              options={locationOptions}
            />
          </div>
          <div className="flex flex-row gap-6 items-center">
            <div className="flex flex-col gap-1 lg:w-full w-fit">
              <p className="font-light">Producción</p>
              <Switch checked={productionFilter} onChange={setProductionFilter} />
            </div>
            <div className="flex flex-col gap-1 lg:w-full w-fit">
              <p className="font-light">Toppers</p>
              <Switch checked={topperFilter} onChange={setTopperFilter} />
            </div>
          </div>
          <div className="flex flex-wrap gap-3 items-center">
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
              record.shippingDate > alertTime ? '' : 'blink'
            )
          }
          size="middle"
          loading={loadingOrders}
          rowKey={(record) => record.id as string}
          locale={{emptyText: 'No hay pedidos'}}
        />
      </div>
      <div>
        <Button
          onClick={() => {
            setShowCompletedOrders(!showCompletedOrders);
            getCompletedOrders();
          }}
        >
          {
            showCompletedOrders ? 'Ocultar pedidos completados' : 'Ver pedidos completados'
          }
        </Button>
      </div>
      {showCompletedOrders && (
        <div className="flex flex-col gap-4">
          <p className="text-xl font-light">Pedidos completados</p>
          <Table
            dataSource={completedOrders}
            columns={columns}
            size="middle"
            loading={loadingCompletedOrders}
            className="hover:cursor-pointer"
            rowKey={(record) => record.id as string}
            locale={{emptyText: 'No hay pedidos'}}
          />
        </div>
      )}
    </section>
  );
}
