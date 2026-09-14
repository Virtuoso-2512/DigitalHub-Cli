export default function Button(data) {
    const variants = ["primary rounded", "secondary", "tertiary", "primary rounded", "tertiary rounded", "tertiary square", "tertiary rounded calm", "tertiary rounded calm calmer"];
    return <button {...data} className={variants[data.variant-1] + " " + data.className}>{data.children}</button>
}