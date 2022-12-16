export const createReceta = (data) => {
    return {
        recipe: data
    }
}

export const createItemReceta = (data) => {
    return {
        product: {
            id: parseInt(data.productId)
        },
        quantity: {
            value: parseInt(data.quantity),
            measure: {
                code: parseInt(data.measureCode)
            }
        }
    }
}