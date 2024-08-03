import type { DocumentNode } from 'graphql'
import type { DataProxy } from '@apollo/client'
import type { OperationVariables } from '@apollo/client/core'
import type { UseQueryReturn } from '@vue/apollo-composable/dist/useQuery.d.ts'
import type { FetchResult } from '@apollo/client/link/core'
import type { QueryRelayParams, TransformUpdate } from '@/composables/query-relay'

import { ApolloCache } from '@apollo/client'
import { useQuery } from '@vue/apollo-composable'
import { InvariantError } from 'ts-invariant'
import { getValue } from '@/shared/utils/graphql-relay'

import { useResult } from '@/composables/query-result'

export function useCommonQuery<
  TResult extends Record<string, unknown>,
  TVariables extends OperationVariables,
  TResultKey extends keyof NonNullable<TResult> = keyof NonNullable<TResult>,
>(queryParams: QueryRelayParams<TResult, TVariables>) {
  const { document, variables = {}, options = {} } = queryParams
  /**
   * Запрос на сервер
   */
  const q: UseQueryReturn<TResult, TVariables> = useQuery<TResult, TVariables>(
    document,
    variables as TVariables,
    options,
  )
  const data = useResult<TResult, TResultKey>(q.result)
  /**
   * Обновление при совершении мутации
   * @param cache - хранилище
   * @param result - результат выполнения мутации
   * @param transform - функция преобразования
   * @param isStrict - происходит ли исключение, если запись отсутствует в кеше
   */
  const update = <TResultMutation>(
    cache: DataProxy,
    result: Omit<FetchResult<TResultMutation>, 'context'>,
    transform: TransformUpdate<TResult, TResultMutation>,
    isStrict = true,
  ): void => {
    try {
      const variablesValue = getValue<TVariables>(variables)
      const cacheData = cache.readQuery<TResult, TVariables>({
        query: document as DocumentNode,
        variables: variablesValue,
      })
      if (cacheData) {
        const data: TResult = transform(cacheData, result)
        cache.writeQuery({ query: document as DocumentNode, variables: variablesValue, data })
      }
    } catch (e) {
      if (e instanceof InvariantError && !isStrict) {
        return
      }
      throw e
    }
  }
  /**
   * Получение данных результата выполнения мутации
   * @param result - результат выполнения мутации
   */
  const getMutationResult = <TResultMutation>(
    result: Omit<FetchResult<TResultMutation, Record<string, any>, Record<string, any>>, 'context'>,
  ): NonNullable<TResultMutation>[keyof NonNullable<TResultMutation>] | undefined | null =>
    result.data && result.data[Object.keys(result.data)[0] as keyof typeof result.data]
  /**
   * Обновление запроса при добавлении
   * @param cache - хранилище
   * @param result - результат выполнения мутации
   * @param key - элемент в мутации
   * @param start - добавление элемента в начало
   */
  const addUpdate = <TResultMutation>(
    cache: ApolloCache<TResult>,
    result: Omit<FetchResult<TResultMutation>, 'context'>,
    key: string | null = null,
    start = true,
  ): void => {
    update(cache, result, (dataCache) => {
      const mutationResult = getMutationResult(result)
      if (!mutationResult) return dataCache

      const dataKey: keyof typeof dataCache = Object.keys(dataCache)[0]
      if (key) {
        const data = Array.isArray(mutationResult[key as keyof typeof mutationResult])
          ? mutationResult[key as keyof typeof mutationResult]
          : [mutationResult[key as keyof typeof mutationResult]]
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dataCache[dataKey] = start ? [...data, ...dataCache[dataKey]] : [...dataCache[dataKey], ...data]
      }
      return dataCache
    })
  }
  /**
   * Обновление запроса при изменении
   * @param cache - хранилище
   * @param result - результат выполнения мутации
   * @param key - элемент в мутации
   */
  const changeUpdate = <TResultMutation>(
    cache: ApolloCache<TResult>,
    result: Omit<FetchResult<TResultMutation>, 'context'>,
    key: string | null = null,
  ): void => {
    update(cache, result, (dataCache) => {
      const mutationResult = getMutationResult(result)
      if (!mutationResult) return dataCache

      const dataKey: keyof typeof dataCache = Object.keys(dataCache)[0]
      if (key) {
        if (Array.isArray(dataCache[dataKey])) {
          const index: number = dataCache[dataKey].findIndex(
            (e: { id: string }) => e.id === (mutationResult[key as keyof typeof mutationResult] as { id: string }).id,
          )
          dataCache[dataKey].splice(index, 1, mutationResult[key as keyof typeof mutationResult])
        } else {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          dataCache[dataKey] = Object.assign(dataCache[dataKey], mutationResult[key as keyof typeof mutationResult])
        }
      }
      return dataCache
    })
  }
  /**
   * Частичное изменение объекта
   * собирает по id и полю, которое нужно изменить.
   * @param cache
   * @param result
   * @param field
   * @param key
   */
  const changePartialUpdate = <TResultMutation>(
    cache: ApolloCache<TResult>,
    result: Omit<FetchResult<TResultMutation>, 'context'>,
    field: string,
    key: string,
  ): void => {
    update(cache, result, (dataCache) => {
      const mutationResult = getMutationResult(result)
      if (mutationResult) {
        const dataKey: keyof typeof dataCache = Object.keys(dataCache)[0]
        const mapMutationsResult: Record<string, unknown> = Array.isArray(mutationResult)
          ? mutationResult.reduce((a, i) => ({ ...a, [i.id]: i[key] }), {})
          : mutationResult
        return {
          ...dataCache,
          [dataKey]: {
            ...(dataCache[dataKey] as unknown as object),
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            [field]: Array.isArray(dataCache[dataKey][field])
              ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                dataCache[dataKey][field].map((el: { id: string | number; [k: string]: any }) => ({
                  ...el,
                  [key]: mapMutationsResult[el.id] || el[key],
                }))
              : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                { ...dataCache[dataKey][field], [field]: mapMutationsResult },
          },
        }
      }
      return dataCache
    })
  }
  /**
   * Замена записей на новые
   * @param cache - хранилище
   * @param result - результат выполнения мутации
   */
  const resetUpdate = <TResultMutation>(
    cache: ApolloCache<TResult>,
    result: Omit<FetchResult<TResultMutation>, 'context'>,
  ): void => {
    update(cache, result, (dataCache) => {
      const mutationResult = getMutationResult(result)
      if (mutationResult) {
        const dataKey: keyof typeof dataCache = Object.keys(dataCache)[0]
        dataCache[dataKey] = (mutationResult as TResult)[dataKey]
      }
      return dataCache
    })
  }
  /**
   * Удаление записи
   * @param cache - хранилище
   * @param result - результат выполнения мутации
   * @param isStrict - происходит ли исключение, если запись отсутствует в кеше
   */
  const deleteUpdate = <TResultMutation>(
    cache: ApolloCache<TResult>,
    result: Omit<FetchResult<TResultMutation>, 'context'>,
    isStrict = true,
  ): void => {
    update(
      cache,
      result,
      (dataCache) => {
        const { id = undefined } = getMutationResult(result) as { id: number | string | undefined }
        if (id) {
          // cache.evict({ id: id as string })
          const dataKey: keyof typeof dataCache = Object.keys(dataCache)[0]
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          dataCache[dataKey] = dataCache[dataKey].filter((e: { id: string }) => e.id !== id)
        }
        return dataCache
      },
      isStrict,
    )
  }

  return {
    ...q,
    data,
    update,
    addUpdate,
    changeUpdate,
    resetUpdate,
    deleteUpdate,
    changePartialUpdate,
  }
}

export type UpdateType<TResult = unknown> = <TResultMutation>(
  cache: ApolloCache<TResult>,
  result: Omit<FetchResult<TResultMutation>, 'context'>,
  transform: TransformUpdate<TResult, TResultMutation>,
) => void
export type AddUpdateType = ReturnType<typeof useCommonQuery>['addUpdate']
export type ChangePartialUpdateType = ReturnType<typeof useCommonQuery>['changePartialUpdate']
export type ChangeUpdateType = ReturnType<typeof useCommonQuery>['changeUpdate']
export type ResetUpdateType = ReturnType<typeof useCommonQuery>['resetUpdate']
export type DeleteUpdateType = ReturnType<typeof useCommonQuery>['deleteUpdate']
