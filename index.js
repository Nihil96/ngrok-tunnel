require("dotenv").config()
const ngrok = require("@ngrok/ngrok")

function validateConfig() {
  if (!process.env.NGROK_PORT) {
    throw new Error("NGROK_PORT is required in .env file")
  }
  if (!process.env.NGROK_TOKEN) {
    throw new Error("NGROK_TOKEN is required in .env file")
  }
}

function getNgrokOptions() {
  return {
    addr: process.env.NGROK_PORT,
    authtoken: process.env.NGROK_TOKEN,
    domain: process.env.NGROK_DOMAIN,
    basic_auth: process.env.NGROK_BASIC_AUTH,
    oauth_provider: process.env.NGROK_OAUTH_PROVIDER,
    oauth_allow_emails: process.env.NGROK_OAUTH_EMAILS?.split(","),
    onStatusChange: (status) => {
      console.log(new Date().toISOString(), `Status change: ${status}`)
    },
  }
}

let listener = null

async function startTunnel() {
  try {
    validateConfig()
    const options = getNgrokOptions()

    console.log("\nStarting ngrok tunnel...")
    listener = await ngrok.forward(options)

    console.log("\n=== Ngrok Tunnel Established ===")
    console.log(`Local Port: ${options.addr}`)
    console.log(`Public URL: ${listener.url()}`)
    if (options.basic_auth) console.log("Basic Auth: Enabled")
    if (options.oauth_provider)
      console.log(`OAuth: Enabled (${options.oauth_provider})`)
    console.log("\nPress Ctrl+C to stop the tunnel\n")
  } catch (error) {
    console.error("\nFailed to establish ngrok tunnel:", error.message)
    process.exit(1)
  }
}

// Handle shutdown
async function cleanup() {
  if (listener) {
    console.log("\nShutting down ngrok tunnel...")
    try {
      await listener.close()
      console.log("Ngrok tunnel closed successfully")
    } catch (error) {
      console.error("Error while closing ngrok tunnel:", error.message)
    }
  }
  process.exit(0)
}

process.on("SIGINT", cleanup)
process.on("SIGTERM", cleanup)
process.on("uncaughtException", async (error) => {
  console.error("\nUncaught exception:", error.message)
  await cleanup()
})

// Start the tunnel
;(async () => {
  await startTunnel()
  process.stdin.resume()
})()
