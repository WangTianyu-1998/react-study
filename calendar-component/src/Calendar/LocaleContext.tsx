import { createContext } from 'react'

export type LocaleContextType = {
  locale: string
}
const LocaleContext = createContext<LocaleContextType>({
  locale: 'zh-CN',
})

export default LocaleContext
