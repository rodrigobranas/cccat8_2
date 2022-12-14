import Checkout from "./application/Checkout";
import GetOrderByCpf from "./application/GetOrdersByCpf";
import Preview from "./application/Preview";
import Item from "./domain/entity/Item";
import OrderController from "./infra/controller/OrderController";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import HapiHttp from "./infra/http/HapiAdapters";
import ItemRepositoryDatabase from "./infra/repository/memory/database/ItemRepositoryDatabase";
import ItemRepositoryMemory from "./infra/repository/memory/ItemRepositoryMemory";
import OrderRepositoryMemory from "./infra/repository/memory/OrderRepositoryMemory";

// const itemRepository = new ItemRepositoryMemory();
// itemRepository.save(new Item(1, "Guitarra", 1000));
// itemRepository.save(new Item(2, "Amplificador", 5000));
// itemRepository.save(new Item(3, "Cabo", 30));
const connection = new PgPromiseAdapter();
const itemRepository = new ItemRepositoryDatabase(connection);
const orderRepository = new OrderRepositoryMemory();
const preview = new Preview(itemRepository);
const checkout = new Checkout(itemRepository, orderRepository);
const getOrderByCpf = new GetOrderByCpf(orderRepository);
// const httpServer = new ExpressAdapter();
const httpServer = new HapiHttp();
new OrderController(httpServer, preview, checkout, getOrderByCpf);
httpServer.listen(3000);
