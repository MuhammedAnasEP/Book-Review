import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useRefreshToken from '../hooks/useRefreshToken'

export default function PersistLogin() {

    const refresh = useRefreshToken()
    const { accessToken } = useAuth()
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        let isMounted = true

        async function verifyUser() {
            try {
                const response = await refresh()
                console.log(response)
            } catch (error) {
                console.log(error?.response)              
            } finally {
                isMounted && setLoading(false)
            }
        }

        !accessToken ? verifyUser() : setLoading(false)

        return () => {
            isMounted = false
        }
    }, [])

    return (
        loading ? "Loading" : <Outlet />
    )
}