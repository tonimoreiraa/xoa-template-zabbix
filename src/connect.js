import {default as Xo} from 'xo-lib'

export async function connectXo()
{
    // Get credentials
    const [url, email, password] = process.argv.slice(3)

    // Connect to XO.
    const xo = new Xo.default({ url })

    // Let's start by opening the connection.
    await xo.open()

    // Must sign in before being able to call any methods (all calls will
    // be buffered until signed in).
    await xo.signIn({ email, password })

    return xo
}