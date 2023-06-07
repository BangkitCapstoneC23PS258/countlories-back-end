const analytics = getAnalytics(app);
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Selamat Datang di Backend Countlories')
})

app.listen(port, () => {
  console.log(`Countlories listening on port ${port}`)
})
