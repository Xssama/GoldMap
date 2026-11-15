
export function CalculateJewelryPrice(weigth, pricePerGram)
{
    const weigth_Num = parseFloat(weigth)
    if (Number.isNaN(weigth_Num) || weigth< 0) {
        return
    }
    return weigth_Num * pricePerGram
}