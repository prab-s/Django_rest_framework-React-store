import { AxiosResponse } from "axios"
import { createContext, useContext, ReactNode, useState, useEffect } from "react"
import useAxios from "../utils/useAxios"

type ShoppingCartProviderProps = { //ShoppingCartProviderContextData
    children: ReactNode
}

type CartItem = {
    [x: string]: any
    id: number,
    // item:{
    //     id:number,
    //     title:string,
    //     sku_num:number,
    //     stock_quant:number,
    //     category:string,
    //     img_url:string,
    // },
    qty: number,
}

type ShoppingCartContext = {
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number, uid?: number, itemElements?:any) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    cartQuantity: number
    cartItems: any
    doCartItemData: (reqType: 'get' | 'post' | 'put' | 'delete', dataToSend?: any, id?: number) => void
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export const useShoppingCart = () => {
    return useContext(ShoppingCartContext)
}

export const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {

    const [cartItems, setCartItems] = useState<CartItem[]>([])
    
    let api = useAxios()

    // const getCartItemData = async () => {
    //     try {
    //         let response = await api.get('/api/cart/')

    //         if (response.status == 200) {
    //             setCartItems(response.data)
    //         }
    //         else {
    //             console.error('Someting went wrong' + '<br/>' + response.status + ' - ' + response.statusText)
    //         }
    //     }
    //     catch (err: any) {
    //         console.error('Tried requesting cart' + '<br/>' + err.message)
    //     }
    // }

    const doCartItemData = async (reqType: 'get' | 'post' | 'put' | 'patch' | 'delete', dataToSend?: any, id?: number) => {
        try {
            var response
            if (reqType == 'get') {
                response = await api.get('/api/cart/')
            }
            else if (reqType == 'put') {
                response = await api.put(`/api/cartUD/${id}`, dataToSend)
            }
            else if (reqType == 'patch') {
                response = await api.patch(`/api/cartUD/${id}`, dataToSend)
            }
            else if (reqType == 'post') {
                response = await api.post(`/api/cartUD/${id}`, dataToSend)
            }
            else if (reqType == 'delete') {
                response = await api.delete(`/api/cartUD/${id}`)
            }


            if (reqType == 'get' && response?.status == 200) {
                setCartItems(response.data)
            }
            else if (reqType == 'post' && response?.status == 200) {
                return response.data
            }
            else if (response?.status == 205) {
                doCartItemData('get')
                console.log("Updated cart items")
            }
            else if (response?.status == 201) {
                doCartItemData('get')
                console.log("New item added to cart")
            }
            else if (response?.status == 204) {
                doCartItemData('get')
                console.log("Item removed from cart")
            }
            else {
                console.error('Someting went wrong' + response?.status + ' - ' + response?.statusText)
            }
        }
        catch (err: any) {
            console.error('Tried requesting cart - ' + err.message)
        }
    }

    // const putCartItemData = async (dataToSend:any, id:number) => {
    //     try {
    //         let response = await api.put(`/api/cartUD/${id}`, dataToSend)

    //         if (response.status == 200) {
    //             console.warn(response.data)
    //         }
    //         else {
    //             console.error('Someting went wrong \n' + response.status + ' - ' + response.statusText)
    //         }
    //     }
    //     catch (err: any) {
    //         console.error('Tried requesting cart \n' + err.message)
    //     }
    // }

    // const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)
    const cartQuantity = cartItems.length

    const getItemQuantity = (id: number) => {
        // Source: https://www.youtube.com/watch?v=lATafp15HWA&t=2170s
        return cartItems.find(item => item.item.id === id)?.qty || 0
    }

    const increaseCartQuantity = (id: number, uid?: number, itemElements?:(number|string)) => {
        try {
            setCartItems(currentItems => {
                if (currentItems.find(item => item.item.id === id) == null) {
                    const newItemToSend = { qty: 1, user: uid, item: itemElements, id:0 }
                    doCartItemData('post', newItemToSend, 0)
                    currentItems.push(newItemToSend)
                    // return newQty
                    return currentItems
                } else {
                    return currentItems.map(entry => {
                        if (entry.item.id === id) {
                            doCartItemData("patch", {id: entry.id, qty: entry.qty + 1}, entry.id)
                            return { ...entry, qty: entry.qty + 1 }
                        } else {
                            return entry
                        }
                    })
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const decreaseCartQuantity = (id: number) => {
        setCartItems(currentItems => {
            if (currentItems.find(item => item.item.id === id)?.qty === 1) {
                currentItems.map(entry => {
                    if (entry.item.id === id) {
                        doCartItemData("delete", null, entry.id)
                    }
                })
                return currentItems.filter(item => item.item.id !== id)
            } else {
                return currentItems.map(entry => {
                    if (entry.item.id === id) {
                        doCartItemData("patch", {id: entry.id, qty: entry.qty - 1}, entry.id)
                        return { ...entry, qty: entry.qty - 1 }
                    } else {
                        return entry
                    }
                })
            }
        })
    }

    const removeFromCart = (id: number) => {
        setCartItems(currentItems => {
            currentItems.map(entry => {
                if (entry.item.id === id) {
                    doCartItemData("delete", null, entry.id)
                }
            })
            return currentItems.filter(item => item.item.id !== id)
        })
    }

    useEffect(() => {
        doCartItemData('get')
    // }, [increaseCartQuantity, decreaseCartQuantity, removeFromCart])
    }, [])

    return (
        <ShoppingCartContext.Provider value={{ doCartItemData, getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, cartItems, cartQuantity }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}