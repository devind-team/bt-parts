import { Args, Mutation, Resolver, Query } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '@auth/auth.guard'
import { CurrentUser } from '@auth/auth.decorators'
import { OrdersService } from '@orders/orders.service'
import { CreateOrderInput } from '@orders/dto/create-order.input'
import { CreateOrderType } from '@orders/dto/create-order.type'
import { OrderConnectionType } from '@orders/dto/order-connection.type'
import { OrderConnectionArgs } from '@orders/dto/order-connection.args'
import { DeleteOrderType } from '@orders/dto/delete-order.type'
import { AddProductInput } from '@orders/dto/add-product.input'
import { User } from '@generated/user'
import { File } from '@generated/file'
import { Order } from '@generated/order'
import { Status } from '@generated/status'
import { OrderStatus } from '@generated/prisma'

@UseGuards(GqlAuthGuard)
@Resolver()
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Query(() => Order)
  async order(
    @CurrentUser() user: User,
    @Args({ name: 'orderId', type: () => String }) orderId: string,
  ): Promise<Order> {
    return this.ordersService.getOrder(orderId)
  }

  @Query(() => OrderConnectionType)
  async orders(@CurrentUser() user: User, @Args() params: OrderConnectionArgs): Promise<OrderConnectionType> {
    return this.ordersService.getOrderConnection(user, params)
  }
  /**
   * Мутация для создания заказа
   * @param user: пользователь
   * @param order: данные заказа
   */
  @Mutation(() => CreateOrderType)
  async createOrder(
    @CurrentUser() user: User,
    @Args({
      name: 'order',
      type: () => CreateOrderInput,
    })
    order: CreateOrderInput,
  ): Promise<CreateOrderType> {
    return this.ordersService.createOrder(user, order)
  }
  /**
   *
   * @param user пользователь
   * @param product добавляемая запчасть
   */
  @Mutation(() => CreateOrderType)
  async addProductToOrder(
    @CurrentUser() user: User,
    @Args({
      name: 'product',
      type: () => AddProductInput,
    })
    product: AddProductInput,
  ): Promise<CreateOrderType> {
    return this.ordersService.addProduct(user, product)
  }
  /**
   * Мутация для удаления заказа
   * @param user: пользователь
   * @param orderId: идентификатор заказа
   */
  @Mutation(() => DeleteOrderType)
  async deleteOrder(
    @CurrentUser() user: User,
    @Args({ type: () => String, name: 'orderId', description: 'Идентификатор заказа' }) orderId: string,
  ): Promise<DeleteOrderType> {
    return { id: await this.ordersService.deleteOrder(user, orderId) }
  }

  /**
   * Добавление статуса к заказу
   * @param user
   * @param orderId
   * @param status
   */
  @Mutation(() => Status)
  async addStatusOrder(
    @CurrentUser() user: User,
    @Args({ type: () => String, name: 'orderId', description: 'Идентификатор заказа' }) orderId: string,
    @Args({ type: () => OrderStatus, name: 'status', description: 'Статус заказа' }) status: OrderStatus,
  ): Promise<Status> {
    return this.ordersService.addStatus(user, orderId, status)
  }
  /**
   * Выгрузка заказа
   * @param user
   * @param orderId
   */
  @Mutation(() => File)
  async unloadOrder(
    @CurrentUser() user: User,
    @Args({ type: () => String, name: 'orderId', description: 'Идентификатор заказа' }) orderId: string,
  ): Promise<File> {
    return this.ordersService.unloadOrder(user, orderId)
  }
}
