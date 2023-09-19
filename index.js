const pg = require('pg');

const client = new pg.Client('postgres://localhost/iceCreamShop_db');

const setup = async() => {
    await client.connect();
    console.log('connected to the database');
    const SQL =`
        CREATE TABLE flavors(
            id SERIAL PRIMARY KEY,
            name VARCHAR(20)
            is_favorite BOOLEAN
        );
        INSERT INTO flavors ()
    `;
    await client.query(SQL);
    console.log('tables created');
};

setup();