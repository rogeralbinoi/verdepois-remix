import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from "../app/theme";
import userEvent from '@testing-library/user-event'

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <ChakraProvider theme={theme}>
            {children}
        </ChakraProvider>
    )
}

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

export const renderWithRouter = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => {
    const user = userEvent.setup()
    return {
      user,
      ...render(ui, { wrapper: BrowserRouter, ...options }),
    }
  }

// eslint-disable-next-line import/export
export * from '@testing-library/react'
// eslint-disable-next-line import/export
export { customRender as render }