const endpointResponse = ({
    res,
    code = 200,
    status = true,
    message,
    body,
    options,
}) => {
    const response = {
        status,
        code,
        message,
        body,
        options,
    }
    res.status(code).json(response)

}

module.exports = endpointResponse

