import {app, port} from "./src/routes.js"

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log(`\nhttp://localhost:${port}`)
})
