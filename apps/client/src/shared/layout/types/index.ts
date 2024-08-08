export interface LinksType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  label?: string | ((...args: any) => string)
  icon: string
  name: string
}

export interface BreadCrumbsItem {
  icon?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  label?: string | ((...args: any) => string)
  name: string
}
