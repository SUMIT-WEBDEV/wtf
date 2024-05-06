import axios from 'axios'
import React, { useEffect, useState } from 'react'

const useClassData = () => {

    const [classData, setClassData] = useState<any>()

    useEffect(() => {
        axios.get("https://6637a59e288fedf69380ea26.mockapi.io/api/v1/classes/classes")
            .then((res: any) => setClassData(res.data))
            .catch((err: any) => console.error('Error fetching classes:', err)
            )
    }, [])



    return classData;
}

export default useClassData