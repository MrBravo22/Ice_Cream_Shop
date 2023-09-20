const pg = require('pg');
const client = new pg.Client('postgres://localhost/iceCreamShop_db');
const express = require('express');
const app = express();

app.get('/api/flavors', async (req, res, next)=> {
    try {
        const SQL = `
            SELECT * from flavors
        `;
        const response = await client.query(SQL);
        res.send(response.rows);

    }
    catch(ex) {
        next(ex);
    }
});

const setup = async() => {
    await client.connect();
    console.log('connected to the database');
    const SQL =`
    DROP TABLE IF EXISTS flavors;
        CREATE TABLE flavors(
            id SERIAL PRIMARY KEY,
            name VARCHAR(20),
            is_favorite BOOLEAN
        );
        INSERT INTO flavors (name, is_favorite) values('vanilla', true);
        INSERT INTO flavors (name, is_favorite) values('chocolate', true);
        INSERT INTO flavors (name, is_favorite) values('strawberry', false);
    `;
    await client.query(SQL);
    console.log('tables created');
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`));
};

setup();