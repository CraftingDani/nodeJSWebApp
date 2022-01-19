// Code() by CraftingDani;



//-- constants --\\

const mysql = require("mysql2")

const db = mysql.createConnection({host: "localhost", user: "nodeServer", password: "robotUsingMySQL2", port: 3306, database: "nodewebserver"})


//-- functionality --\\

export function addRow(name, email, password)  //INSERT
{
    db.connect(function(error)
    {
        if(error) throw error

        const query = `INSERT INTO nodeserver (name, email, password) VALUES ('${name}', '${email}', '${password}')`
        db.query(query, function(error, results)
        {
            if(error) throw error

            return results
        })
    })
}

export function getItem(item, id)  //SELECT
{
    db.connect(function(error)
    {
        if(error) throw error

        const query = `SELECT ${item} FROM nodeserver WHERE id = ${id}`
        db.query(query, function(error, results)
        {
            if(error) throw error

            return results
        })
    })
}

export function deleteRow(id)  //DELETE
{
    db.connect(function(error)
    {
        if(error) throw error

        const query = `DELETE FROM nodeserver WHERE id = ${id}`
        db.query(query, function(error, results)
        {
            if(error) throw error

            return results
        })
    })
}

export function updateRow(newName, newEmail, newPassword, id)  //UPDATE
{
    db.connect(function(error)
    {
        if(error) throw error

        const query = `UPDATE nodeserver SET name = '${newName}', email = '${newEmail}', password = '${newPassword}' WHERE id = ${id}`
        db.query(query, function(error, results)
        {
            if(error) throw error

            return results
        })
    })
}
