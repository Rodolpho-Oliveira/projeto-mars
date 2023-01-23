import app from "./index.js"
import dotenv from "dotenv"
dotenv.config()

const host = "0.0.0.0"
const PORT = process.env.PORT || 5000
app.listen(PORT, host, () => {
  console.log(`Server is listening on port ${PORT}`)
})