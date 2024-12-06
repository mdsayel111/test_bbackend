const express = require('express')
const app = express()
const port = 3000

const stripe = require('stripe')('sk_test_51OEV5zDsoBM3ry43CA7u3xs0Mh2ij3QaWJqalFwpu43zbwEivIQukSrsMdokuGofnlmVYnUysHOAEexTIWdT3YKs00mSKAmvoS');



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post("/payment", async (req, res) => {
    const stripe = require('stripe')('sk_test_51OEV5zDsoBM3ry43CA7u3xs0Mh2ij3QaWJqalFwpu43zbwEivIQukSrsMdokuGofnlmVYnUysHOAEexTIWdT3YKs00mSKAmvoS');

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Your Product Name',
                    },
                    unit_amount: 2000, // Amount in cents (e.g., $20)
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: 'https://yourwebsite.com/success',
        cancel_url: 'https://yourwebsite.com/failure',
    });

    res.send(session);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})