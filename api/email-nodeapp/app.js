const nodemailer = require('nodemailer');
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser')
const app = express();

const urlencodedParser = express.urlencoded({extended: false});

var corsOptions = {
  origin: 'http://localhost:3000/'
}

app.use(bodyParser.json())
app.use(urlencodedParser)
app.use(cors())
app.options('*', cors())


app.post("/send_email_kitchen", async (req, res) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "soulrivsmtp@gmail.com",
          pass: "cbuulutuwemhovjy"
        },
    })

    await res.send(req.body)
    
    message = {
        from: "soulrivsmtp@gmail.com",
        to: "soulrivsmtp@gmail.com",
        subject: "Нове замовлення - Кухня",
        text: `
        Замовник -  ${req.body.name}
        Контактний номер -  ${req.body.mobile}
        Матеріал -  ${req.body.material}
        Площа (кв/м) -  ${req.body.area}
        Ітогова ціна (ГРН) -  ${req.body.total}
        `
    }
    await transporter.sendMail(message, function(err, info) {
        if (err) {
          // console.log(err)
        } else {
          // console.log(info);
        }
    })
})

app.post("/send_email_door", async (req, res) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "soulrivsmtp@gmail.com",
          pass: "cbuulutuwemhovjy"
        },
    })

    await res.send(req.body)
    
    message = {
        from: "soulrivsmtp@gmail.com",
        to: "soulrivsmtp@gmail.com",
        subject: "Нове замовлення - Двері",
        text: `
        Замовник -  ${req.body.name}
        Контактний номер -  ${req.body.mobile}
        Матеріал -  ${req.body.material}
        Довжина маршу (см) -  ${req.body.length}
        Ширина маршу (см) -  ${req.body.width}
        Площа (кв/м) -  ${req.body.area}
        Ітогова ціна (ГРН) -  ${req.body.total}
        `
    }
    await transporter.sendMail(message, function(err, info) {
        if (err) {
          // console.log(err)
        } else {
          // console.log(info);
        }
    })
})

app.post("/send_email_stairs", async (req, res) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "soulrivsmtp@gmail.com",
          pass: "cbuulutuwemhovjy"
        },
    })

    await res.send(req.body)
    
    message = {
        from: "soulrivsmtp@gmail.com",
        to: "soulrivsmtp@gmail.com",
        subject: "Нове замовлення - Сходи",
        text: `
        Замовник -  ${req.body.name}
        Контактний номер -  ${req.body.mobile}
        Матеріал -  ${req.body.material}
        Довжина маршу (см) -  ${req.body.length}
        Ширина маршу (см) -  ${req.body.width}
        Підйом (м) -  ${req.body.rise}
        Ітогова ціна (ГРН) -  ${req.body.total}
        `
    }
    await transporter.sendMail(message, function(err, info) {
        if (err) {
          // console.log(err)
        } else {
          // console.log(info);
        }
    })
})


app.listen(
    4000, () => {
        console.log("Server is listening on port 4000")
    }
)
