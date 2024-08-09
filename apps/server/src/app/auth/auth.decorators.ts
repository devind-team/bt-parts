import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context)
  return ctx.getContext().req?.user ?? null
})

export const CurrentRestUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest()
  return req.user ?? null
})
