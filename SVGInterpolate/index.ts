import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { SVGPathInterpolator } from "./SVGPathInterpolator"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.')

    const interpolator = new SVGPathInterpolator()

    if (!req.body) {
        context.res = {
            status: 400,
            body: "Please POST an SVG path data string in the request body"
        }
    } else {
        const pathData = req.body
        const interpolatedPathData = interpolator.processSvg(pathData)

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: JSON.stringify(interpolatedPathData)
        }
    }
}

export default httpTrigger
