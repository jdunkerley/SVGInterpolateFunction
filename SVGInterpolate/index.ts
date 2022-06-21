import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { processSvg } from "./SVGPathInterpolator"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.')

    if (!req.body) {
        context.res = {
            status: 400,
            body: "Please POST an SVG path data string in the request body"
        }
    } else {
        const pathData = req.body
        const minDistance = +req.query.minDistance || 0.5
        const roundToNearest = +req.query.roundToNearest || 0.25
        const sampleFrequency = +req.query.sampleFrequency || 0.001
        const interpolatedPathData = processSvg(pathData, minDistance, roundToNearest, sampleFrequency)

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: JSON.stringify(interpolatedPathData),
            headers: {
                "Content-Type": "application/json"
            }
        }
    }
}

export default httpTrigger
