import {useEffect, useState} from "react";
import type {IWish} from "@/interfaces/wish-interface.ts";

const API_BASE  = import.meta.env.VITE_API_URL as string || "http://localhost:3000/wishes";

function useFetchData<T extends IWish>({url = "0"} :{url?: string}) : {data?: T, isLoading: boolean, error?: Error} {

    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        let ignore = false
        setIsLoading(true)

        fetch(`${API_BASE}/${url}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch')
                }
                return res.json()
            })
            .then(d => {
                if (!ignore) {
                    setData(d)
                    setError(undefined)
                }
            })
            .catch(e => {
                if (!ignore) {
                    setError(e)
                    setData(undefined)
                }
            })
            .finally(() => {
                if (!ignore) {
                    setIsLoading(false)
                }
            })
        return () => {
            ignore = true
        }
    }, [])

    return {data, isLoading, error}
}


export default useFetchData