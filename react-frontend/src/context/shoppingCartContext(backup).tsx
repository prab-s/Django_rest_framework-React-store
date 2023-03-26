import { createContext, useContext, ReactNode, useState } from "react"

type ShoppingCartProviderProps = { //ShoppingCartProviderContextData
    children:ReactNode
}

type CartItem = {
    id:number
    quantity:number
}

type ShoppingCartContext = {
    getItemQuantity:(id:number) => number
    increaseCartQuantity:(id:number) => void
    decreaseCartQuantity:(id:number) => void
    removeFromCart:(id:number) => void
    cartQuantity:number
    cartItems:CartItem[]
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export const useShoppingCart = () => {
    return useContext(ShoppingCartContext)
}

export const ShoppingCartProvider = ({children}:ShoppingCartProviderProps) => {

    const [cartItems, setCartItems] = useState<CartItem[]>([])

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

    const getItemQuantity = (id:number) => {
        // Source: https://www.youtube.com/watch?v=lATafp15HWA&t=2170s
        return cartItems.find(item => item.id === id) ?.quantity || 0
    }

    const increaseCartQuantity = (id:number) => {
        setCartItems(currentItems => {
            if (currentItems.find(item => item.id === id) == null){
                return [...currentItems, {id, quantity:1}]
            } else {
                return currentItems.map(item => {
                    if (item.id === id) {
                        return {...item, quantity:item.quantity+1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    const decreaseCartQuantity = (id:number) => {
        setCartItems(currentItems => {
            if (currentItems.find(item => item.id === id)?.quantity === 1){
                return currentItems.filter(item => item.id !== id)
            } else {
                return currentItems.map(item => {
                    if (item.id === id) {
                        return {...item, quantity:item.quantity-1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    const removeFromCart = (id:number) => {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }

    return (
        <ShoppingCartContext.Provider value={{ getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, cartItems, cartQuantity }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}