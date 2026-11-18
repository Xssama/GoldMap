
export function CalculateChartCoordinates(prices)
{
    const PointsCoordinates = []
    const width = 800;
    const height = 300;

    const margin = {
        top: 20,
        right: 20,
        bottom: 50,
        left: 60
    };
    const chartWidth =  width - margin.right -margin.left
    const chartHeight = height - margin.top - margin.bottom

    const MaxPrice = Math.max(...prices)
    const MinPrice = Math.min(...prices)

    let index = 0
   prices.forEach(function(price) {
    let x = margin.left + index * (chartWidth / (prices.length - 1))

    let normalized = (price - MinPrice) / (MaxPrice - MinPrice)
    let y = margin.top + (1 - normalized) * chartHeight
    PointsCoordinates.push({x, y})
    index++
   })
    
    return  {maxPrice: MaxPrice, minPrice: MinPrice,pointsCorrdinates :PointsCoordinates}
}


export function renderLineChart(chart_element, coordinates)
{
    const chartLine_element = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')

    const label_step = Math.floor(coordinates.length / 6)
    const coordinates_str = coordinates.map((point) => {
        let point_str = point.x + ','+ point.y
        return point_str
    }).join(' ')
   
    chartLine_element.setAttribute('points', coordinates_str)
    chartLine_element.setAttribute('fill', "none")
    chartLine_element.setAttribute('stroke', 'black')
    chartLine_element.setAttribute('stroke-width', 2)
    chartLine_element.setAttribute('stroke-linecap', 'round')
    chartLine_element.setAttribute('stroke-linejoin', 'round')
    chart_element.appendChild(chartLine_element)

        let index = 0
        for (const coordinate of coordinates)
        {
            
            const circle_element = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
            circle_element.setAttribute('cx', coordinate.x)
            circle_element.setAttribute('cy', coordinate.y)
            circle_element.setAttribute('r', '5')
            circle_element.setAttribute('stroke', 'white')
            circle_element.setAttribute('stroke-width', '2')

            if (index % label_step === 0) {
                
                const label = document.createElementNS('http://www.w3.org/2000/svg', 'text')
                label.setAttribute('x', coordinate.x)
                label.setAttribute('y', 275)
                label.setAttribute('text-anchor', 'middle')
                label.setAttribute('font-size', 12)
                label.textContent = index

                chart_element.appendChild(label)
            }
            chart_element.appendChild(circle_element)
            index++
        }

}