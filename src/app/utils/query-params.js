export const getParams = filters => {
    for (let property in filters) {
        let str = ''
        let first = true
        if (filters.hasOwnProperty(property)) {
            let value = filters[property]
            if(value !== '' && value !== 0 && value !== undefined){
                if(first){
                    str += `?${property}=${value}`
                    first = false
                }
                else
                    str += `&${property}=${value}`
            }          
        }
        return str
    }
}