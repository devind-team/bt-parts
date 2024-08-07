import defu from 'defu'
import type { ComputedRef } from 'vue'
import { computed, ref } from 'vue'

import type {
  PageInfo,
  PaginationMode,
  PaginationInterface,
  PaginationOptions,
  PaginationVariablesType,
} from '@repo/queries/types/pagination.ts'

import { cursor } from '@/shared/utils/graphql-relay'

/**
 * Пагинация, основанная на offset подходе
 * @param paginationOptions
 */
export function useOffsetPagination(paginationOptions: PaginationOptions = {}): PaginationInterface {
  const defaultOptions: PaginationOptions = {
    page: 1,
    pageSize: 30,
    mode: 'paged',
  }
  const options: PaginationOptions = defu(paginationOptions, defaultOptions)

  const page = ref<number>(options.page as number)
  const pageSize = ref<number>(options.pageSize as number)
  const count = ref<number>(0)
  const totalCount = ref<number>(0)

  /**
   * Расширение переменных в зависимости от типа пагинации
   */
  const extendVariables = computed<PaginationVariablesType>(() => ({
    first: pageSize.value,
    skip: (page.value - 1) * pageSize.value,
  }))

  const variables: ComputedRef<PaginationVariablesType> =
    options.mode === 'fetch'
      ? computed<PaginationVariablesType>(() => ({
          first: pageSize.value,
          skip: 0,
        }))
      : extendVariables

  const fetchMore: ComputedRef<boolean> = computed<boolean>(() => {
    return page.value * pageSize.value < totalCount.value
  })

  /**
   * Пересчитываем значение позиции страницы
   */
  const recountPage = (): void => {
    page.value = Math.ceil(count.value / pageSize.value)
  }

  /**
   * Устанавливаем новую страницу
   * @param p
   */
  const setPage = (p = 1): void => {
    page.value = p
  }

  /**
   * Устанавливаем количество записей
   * @param tc - totalCount
   * @param c - count
   */
  const setQueryInfo = (tc: number, c: number): void => {
    count.value = c
    totalCount.value = tc
  }

  const setOptions = ({ page, itemsPerPage }: { page: number; itemsPerPage: number }) => {
    setPage(page)
    pageSize.value = itemsPerPage
  }

  return {
    mode: options.mode as PaginationMode,
    page,
    pageSize,
    totalCount,
    count,
    fetchMore,
    variables,
    extendVariables,
    setPage,
    setQueryInfo,
    recountPage,
    setOptions,
  }
}

/**
 * Пагинация, основанная на cursor подходе
 * @param paginationOptions
 */
export function _useCursorPagination(paginationOptions: PaginationOptions = {}): PaginationInterface {
  const {
    page,
    setPage,
    pageSize,
    mode,
    totalCount,
    count,
    setQueryInfo: setQueryInfoParent,
    setOptions,
  } = useOffsetPagination(paginationOptions)

  const pageInfo = ref<PageInfo>({
    hasPreviousPage: true,
    hasNextPage: true,
  })

  const variables: ComputedRef<PaginationVariablesType> = computed<PaginationVariablesType>(() => ({
    first: pageSize.value,
  }))

  const extendVariables: ComputedRef<PaginationVariablesType> = computed<PaginationVariablesType>(() => ({
    first: pageSize.value,
    after: cursor(count.value - 1),
  }))

  const fetchMore: ComputedRef<boolean> = computed<boolean>(() => {
    return pageInfo.value.hasNextPage as boolean
  })

  /**
   * Устанавливаем количество записей
   * @param tc - totalCount
   * @param c - количество записей
   * @param pi - pageInfo
   */
  const setQueryInfo = (tc: number, c: number, pi?: PageInfo): void => {
    setQueryInfoParent(tc, c)
    if (pi) {
      pageInfo.value = pi
    }
  }

  return {
    mode,
    page,
    pageSize,
    totalCount,
    count,
    fetchMore,
    variables,
    extendVariables,
    pageInfo,
    setPage,
    setQueryInfo,
    setOptions,
  }
}
